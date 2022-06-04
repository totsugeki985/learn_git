import sys
import re
from os import path, linesep
from PIL import Image


if len(sys.argv) < 2:
    print( "Usage: python GaniParser.py gani_path" )
    exit(1)
    
with open( "config.txt" , "r" ) as config_file:
    config = {}
    lines = config_file.readlines()
    for line in lines:
        tokens = line.split("=")
        config[ tokens[0] ] = tokens[1]
    

GRAAL_FOLDER = config.get( "graal_folder" )
LEVELS_FOLDER = path.join( GRAAL_FOLDER , "levels" )
BODIES_FOLDER = path.join( LEVELS_FOLDER , "bodies" )
HEADS_FOLDER = path.join( LEVELS_FOLDER , "heads" )

GANI = sys.argv[1]

DEFAULT_SPRITES = \
{ 
    "BODY" : ( BODIES_FOLDER , "body1.png" ) , 
    "HEAD" : ( HEADS_FOLDER  , "head0.png" )
}

class Settings:
    
    def __init__( self , settings_data ):
        self.loop = False
        self.continuous = False
        self.default_param1 = ""
        self.default_param2 = ""
        self.default_param3 = ""
        self.default_attr1 = "hat0.png"
        self.default_attr2 = ""
        self.default_attr3 = ""
        self.default_head = "head0.png"
        self.default_body = "body1.png"
        self.default_shield = "shield1.png"
        self.parse_settings_data( settings_data )
        
    def setTrue( self , attr_name , useless_arg="rawR" ):
        setattr( self , attr_name , True )
        
    def setString( self , attr_name , string ):
        #print( "setting " + attr_name + " to " + string )
        setattr( self , attr_name , string )
        
    def parse_settings_data( self , settings_data ):
    
        switch_map = \
        {
            "LOOP" : ( self.setTrue , "loop" ) ,
            "CONTINUOUS" : ( self.setTrue , "continuous" ) ,
            "DEFAULTPARAM1" : ( self.setString , "default_param1" ) ,
            "DEFAULTPARAM2" : ( self.setString , "default_param1" ) ,
            "DEFAULTPARAM3" : ( self.setString , "default_param1" ) ,
            "DEFAULTATTR1" : ( self.setString , "default_attr1" ) ,
            "DEFAULTATTR2" : ( self.setString , "default_attr1" ) ,
            "DEFAULTATTR3" : ( self.setString , "default_attr1" ) ,
            "DEFAULTHEAD" : ( self.setString , "default_head" ) ,
            "DEFAULTBODY" : ( self.setString , "default_body" ) ,
            "DEFAULTSHIELD" : ( self.setString , "default_shield" )
        }
        for line in settings_data:
            tokens = line.split( " " )
            
            #loop/continuous have no second token after, and only appear in data if true            
            if len(tokens) == 1:
                tokens.append("unused string for setTrue" )
                
            two_tuple = switch_map.get( tokens[0] )
            
            if two_tuple is None: 
                print( "setting not coded : " + tokens[0])
                continue
            
            function , attr_name = two_tuple
            function( attr_name , tokens[1] )
            #print( attr_name + ":" + str(getattr( self , attr_name )) )

    def __str__( self ):
        return ( 
            "Settings( loop={} , continuous={} , defaultparam1={} , defaultparam2={} , defaultparam3={} , "
            "defaultattr1={} , defaultattr2={}, defaultattr3={}, defaulthead={} , defaultbody={}, defaultshield={} )" 
        ) \
        .format( self.loop , self.continuous , self.default_param1 , self.default_param2 , self.default_param3 , \
        self.default_attr1 , self.default_attr2 , self.default_attr3 , self.default_head , self.default_body , self.default_shield )

class Still:

    def __init__( self , still_data , sprite_map ):
        self.sprite_map = sprite_map
        self.sprite_coords = self.parse_sprite_coords( still_data )
        self.length = self.parse_length( still_data )
        self.sound_file = self.parse_sound_file( still_data )
        self.offset = self.calculate_offset( self.sprite_coords )
        print( self )

        
    def parse_sound_file( self , still_data ):
        match = re.search( "PLAYSOUND.*" , still_data , re.DOTALL )
        if match is None:
            return None
        line = match.group(0)
        tokens = line.split( " " )
        return tokens[1]
    
    def parse_length( self , still_data ):
        match = re.search( "WAIT.*" , still_data , re.DOTALL )
        if match is None:
            return 0.05 #the length of 1 frame in graal
        line = match.group(0)
        tokens = line.split( " " )
        return 0.05 + 0.05 * int(tokens[1])
    
    def parse_sprite_coords( self , still_data ):
        sprite_coords = {}
        matches = re.findall( "-?[0-9]+\s+-?[0-9]+\s+-?[0-9]+" , still_data )
        for match in matches:
            split = re.split( "\s+" , match )
            sprite_coords[ int(split[0]) ] = ( int(split[1]) , int(split[2]) ) 
        return sprite_coords
        
        #match = re.search( "[0-9].*[0-9]" , still_data.replace("\n",",  ") , re.DOTALL )
        # coord_data = match.group(0).split(",  ")
        # print( coord_data )
        # for item in coord_data:
            # match = 
            # sprite_coords[ int(split[0]) ] = ( split[1] , split[2] )
        # return sprite_coords
        
    def calculate_offset( self , sprite_coords ):
        return ( 0 , 0 )
        
    
    def __str__( self ):
        return "Still( sprite_coords={} ,\nlength={} , sound_file={} , offset={} )".format( self.sprite_coords , self.length , \
        self.sound_file , self.offset )
        

class Animation:
    
    def __init__( self , animation_data , sprite_map ):
        self.stills = self.get_stills( animation_data , sprite_map )
        
    def get_stills( self , animation_data , sprite_map ):
        stills = []
        chunks = animation_data.split( "\n\n" )
        for chunk in chunks:
            stills.append( Still( chunk , sprite_map ) )
        return stills
        

class Sprite:
    
    def __init__( self , sprite_data ):
        self.sprite_index , \
        self.sprite_type ,  \
        self.x , \
        self.y , \
        self.width , \
        self.height , \
        self.name = self.parse_sprite_data( sprite_data )
        self.image = None
        
    #index, type , x , y , width , height , name
    def parse_sprite_data( self , data ):
        fields = re.split( "\s+" , data )
        name = fields[7]
        
        #quick dirty way to get the rest of name
        if len(fields) > 7:
            for x in range( 8 , len(fields) ):
                name += " " + fields[x]
                
        return int(fields[1]) , fields[2] , int(fields[3]) , int(fields[4]) , int(fields[5]) , int(fields[6]) , name
        
    def get_image( self ):
    
        if self.image is not None:
            return self.image 

        path_info = DEFAULT_SPRITES.get( self.sprite_type )        
        
        if path_info is None:
            print( "sprite type not coded: " + self.name )
            return None
            
        folder , img_file = path_info
        
        with Image.open( path.join(folder , img_file) ) as image:
            box = (self.x , self.y , self.x + self.width , self.y + self.height) #left , upper , right , lower
            self.image = image.crop( box )
            self.image.save( self.name.replace("\s","_") + "_" + str(self.sprite_index) + ".png" ) #for debugging
            return self.image
        
    def __str__( self ):
        return (
            "Sprite( sprite_index={} , sprite_type={} , "
            "x={} , y={} , width={} , height={}, name={} )"
        ).format( self.sprite_index, self.sprite_type, \
        self.x , self.y , self.width , self.height , self.name )

class GaniParser:

    def __init__( self , filename ):
    
        with open( filename , "r" ) as file:
            self.content = file.read()
            self.lines = self.content.splitlines()
            
        #print( len(self.lines) )
        self.lines_parsed = 1 # skip first line, its just "Gani0001"
        
        self.sprite_map = self.get_sprite_map()        
        self.settings = self.get_settings()                
        self.animation = self.get_animation()
        
        
        
        
    def get_sprite_map( self ):
        sprite_map = {}

        for x in range( self.lines_parsed , len(self.lines) ):
            self.lines_parsed += 1
            
            if self.lines[x][0:6] == "SPRITE":
                sprite = Sprite( self.lines[x] )
                sprite_map[ sprite.sprite_index ] = sprite
            else:
                break
                
        return sprite_map
        
    def get_settings( self ):
        settings_data = []
        for x in range( self.lines_parsed , len(self.lines) ):
            self.lines_parsed +=1 
            
            if self.lines[x] == "":
                break
            else:
                settings_data.append( self.lines[x] )
        return Settings( settings_data )
                
    def get_animation( self ):
        match = re.search( "ANI\n.+?ANIEND" , self.content , flags=re.DOTALL ) 
        if match:
            data = match.group(0)
            data = data.lstrip( "ANI" + linesep )
            data = data.rstrip( "ANIEND" + linesep )
            return Animation( data , self.sprite_map )
        return None

    

GaniParser( GANI )
		