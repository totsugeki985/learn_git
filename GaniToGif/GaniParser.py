import sys
import re
from os import path, linesep
from os.path import expanduser
from PIL import Image, ImageColor


if len(sys.argv) < 3:
    print( "Usage: python GaniParser.py gani_path direction" )
    exit(1)

class Config:

    def __init__( self ):
        self.graal_folder = path.join( expanduser("~") , "Graal" )
        self.default_colors = \
        {
            "skin" : "#FFAD6B" ,  #orange
            "coat" : "#FFFFFF" , #white
            "belt" : "#0000FF" , #blue
            "shoes" :  "#CE1829"  , #fire engine red
            "sleeves" : "#FF0000" #red
        }
        self.colors = {}
        
        self.read_config("config.txt") #overwrites sel;f.graal_folder if specified in config.txt, else its in the User's root folder   
        
        self.levels_folder = path.join( self.graal_folder , "levels" )
        self.images_folder = path.join( self.levels_folder , "images" )
        self.bodies_folder = path.join( self.levels_folder , "bodies" )
        self.heads_folder = path.join( self.levels_folder , "heads" )
        self.shields_folder = path.join( self.levels_folder , "shields" )
        self.hats_folder = path.join( self.levels_folder , "hats" )
        self.emoticons_folder = path.join( self.levels_folder , "emoticons" )
        self.downloads_folder = path.join( self.levels_folder , "downloads" )
        
        
        
        print( self )
        
    def read_config(self , config_filename):
        parse_map = \
        {
            "graal_folder" : setattr ,
            "head" : setattr ,
            "body" : setattr ,
            "hat" : setattr ,
            "colors" : self.parse_colors
        }
        with open( config_filename , "r" ) as config_file:
            lines = config_file.readlines()
            
        for line in lines:
        
            tokens = line.split("=")
            
            if len(tokens) < 2:
                continue
                
            function = parse_map.get( tokens[0] )
            if function is None:
                continue
            
            function( self , tokens[0] , tokens[1].rstrip("\n") )
            
    def parse_colors( self , rawr , dummy , color_string ):
        print( color_string )
        matches = re.findall(  "[a-z]+?:#[a-zA-Z0-9]{6}" , color_string )
        print( matches )
        for match in matches:
            tokens = match.split(":")
            if len(tokens) != 2:
                continue
            self.colors[ tokens[0] ] = tokens[1]
            
    def __str__(self):
        string = "Config(\n"
        for name , value in vars(self).items():
            string += str(name) + "=" + str(value) + "\n"
        return string + ")"
        
        
config = Config()
GANI = sys.argv[1]
    

        

DEFAULT_SPRITES = \
{ 
    "BODY" : ( config.bodies_folder , config.body ) , 
    "HEAD" : ( config.heads_folder  , config.head ) ,
    "SHIELD" : ( config.shields_folder , "shield1.png" ),
    "ATTR1" : ( config.hats_folder , config.hat ),
}

class Utils:

    def __init__(self):
        pass
        
    #retrieves files like era_foobar by splitting the string and checking if the file is there    
    #fuck the images can be in any of the folders.... wtf.  one is a shield - check chidori
    @staticmethod
    def get_image( file_name ):
        tokens = file_name.split("_")
        
        if len( tokens ) < 1:
            return None
            
        file_path = path.join( path.join( config.images_folder , tokens[0] ) , file_name )
        
        if path.isfile( file_path ): #it was in a folder like era/era_bugnet.png
            return Image.open( file_path ).convert( "RGBA" )
            
        #print( file_path + " " + str( path.isfile( file_path ) ) )
        
        #check these folders maybe...
        other_folders = os.listdir( config.levels_folder )
        for folder in other_folders:
            file_path = path.join( path.join( config.images_folder , folder ) , file_name )
            
            if path.isfile( file_path ):
                return Image.open( file_path ).convert( "RGBA" )
           
        #not found at all
        print( "cant find file_name" )
        return None
    
    @staticmethod
    def set_color( image , color_map , new_color_map ):
    
        if len( color_map ) == 0 or len(new_color_map) == 0:
            return image
            
        new_color_map_items = new_color_map.items()
        
        width, height = image.size
        px = image.load()
        for x in range( 0 , width ):
            for y in range( 0 , height ):
                pixel_rgba = px[x,y]
                for key , value in new_color_map_items:
                    color_rgb = ImageColor.getcolor( color_map.get(key) , mode="RGBA" )
                    if pixel_rgba[0] == color_rgb[0] and pixel_rgba[1] == color_rgb[1] and pixel_rgba[2] == color_rgb[2]: # and rgba[3] == color_rgb[3]:
                        new_color_hex = value
                        new_color_rgb = ImageColor.getcolor( new_color_hex , mode="RGBA" )
                        image.putpixel( ( x , y ) , new_color_rgb )
        return image
                    
            
        
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
        
        #quick dirty way to get the rest of name
        if len(fields) > 7:
            name = fields[7]
            for x in range( 8 , len(fields) ):
                name += " " + fields[x]
            return int(fields[1]) , fields[2] , int(fields[3]) , int(fields[4]) , int(fields[5]) , int(fields[6]) , name
                
        return int(fields[1]) , fields[2] , int(fields[3]) , int(fields[4]) , int(fields[5]) , int(fields[6]) , ""  # sometimes there is no name
        
    def get_image( self ):
    
        if self.image is not None:
            return self.image 
        
        #print( self )        
        if "." in self.sprite_type:  #is a filename
            image = Utils.get_image( self.sprite_type )
            if image is None:
                return None
            box = (self.x , self.y , self.x + self.width , self.y + self.height) #left , upper , right , lower
            self.image = image.crop( box )
            return self.image
            
            
        path_info = DEFAULT_SPRITES.get( self.sprite_type )        
        
        if path_info is None:
            #print( "sprite type not coded: " + self.sprite_type )
            return None
            
        folder , img_file = path_info
        
        try:
        
            with Image.open( path.join(folder , img_file) ) as image:
                image = image.convert("RGBA")
                box = (self.x , self.y , self.x + self.width , self.y + self.height) #left , upper , right , lower
                self.image = image.crop( box )
                #change colors of the head/body
                if self.sprite_type == "BODY":
                    #print( "was a head/body" )
                    for part , new_color in config.colors.items():
                        #print( "part: " + part + " , color: " + new_color )
                        #print( "part: " + part + " , new_color: " + config.default_colors.get(part) )
                        image = Utils.set_color( self.image , config.default_colors , config.colors )
                #self.image.save( self.name.replace("\s","_") + "_" + str(self.sprite_index) + ".png" ) #for debugging
                return self.image
        except FileNotFoundError:
            return None
        
    def __str__( self ):
        return (
            "Sprite( sprite_index={} , sprite_type={} , "
            "x={} , y={} , width={} , height={}, name={} )"
        ).format( self.sprite_index, self.sprite_type, \
        self.x , self.y , self.width , self.height , self.name )

class Still:

    def __init__( self , still_data , sprite_map , direction ):
        self.directions = \
        { 
            "up" : 0 , 
            "left" : 1 , 
            "down" : 2 , 
            "right" : 3
        }
        self.sprite_map = sprite_map
        self.sprite_coords = self.parse_sprite_coords( still_data , direction )
        self.length = self.parse_length( still_data )
        self.sound_file = self.parse_sound_file( still_data )
        self.offset = self.calculate_offset( self.sprite_coords )
        #print( "still offset: " + str(self.offset) ) 
        #self.sprite_coords = self.adjust_coords( self.sprite_coords , self.offset )
        self.dimensions = self.calculate_dimensions( self.sprite_coords )
        

        
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
    
    def parse_sprite_coords( self , still_data , direction ):
        sprite_coords = {}
        directions = still_data.split("\n") #up, left , down, right
        matches = re.findall( "-?[0-9]+\s+-?[0-9]+\s+-?[0-9]+" , directions[ self.directions.get(direction) ] )
        for match in matches:
            split = re.split( "\s+" , match )
            sprite_coords[ int(split[0]) ] = ( int(split[1]) , int(split[2]) ) 
        return sprite_coords
        
        
    def calculate_offset( self , sprite_coords ):
        x_offset = 0
        y_offset = 0
        for coord in sprite_coords.values():
            if coord[0] < x_offset:
                x_offset = coord[0]
            if coord[1] < y_offset:
                y_offset = coord[1]
        return ( abs(x_offset) , abs(y_offset) )
        
    def adjust_coords( self , offset ):
        
        if offset[0] == 0 and offset[1] == 0:
            return
            
        for key , value in self.sprite_coords.items():
            self.sprite_coords[key] = ( value[0] + offset[0], value[1] + offset[1] )
            

            
        
    def calculate_dimensions( self , sprite_coords ):
        dim_x = 0
        dim_y = 0
        for sprite_index, coord  in sprite_coords.items():
            width = self.sprite_map[sprite_index].width
            height = self.sprite_map[sprite_index].height
            if coord[0] + width > dim_x:
                dim_x = coord[0] + width
            if coord[1] + height > dim_y:
                dim_y = coord[1] + height
        return ( 0 , 0 , dim_x , dim_y )
        
        
    def create_image( self , dimensions ):
        still_img = Image.new( "RGBA" , dimensions ) 
        #still_img.save( "stills\\backdrop.png" ) 
        for sprite_index , coord in self.sprite_coords.items():
            sprite = self.sprite_map[sprite_index]
            sprite_img = sprite.get_image()
            
            #print( sprite )
            #print( sprite_img )
            
            if sprite_img is None:
                continue
                
            still_img.paste( sprite_img , ( coord[0] , coord[1] ) , mask=sprite_img)#, coord[0] + 20 , coord[1] + 20 ) )
        #still_img.save( "stills\\backdrop_sprite_pasted.png" )
        return still_img
        
    
    def __str__( self ):
        return "Still( sprite_coords={} ,\nlength={} , sound_file={} , offset={} , dimensions={})".format( self.sprite_coords , self.length , \
        self.sound_file , self.offset , self.dimensions )
        

class Animation:
    
    def __init__( self , animation_data , sprite_map , direction ):
        self.direction = direction
        self.stills = self.get_stills( animation_data , sprite_map , direction )
        self.dimension = self.get_largest_dimension( self.stills )
        self.offset = self.calculate_offset( self.stills )
        #print( self.offset )

        
    def get_stills( self , animation_data , sprite_map , direction ):
        stills = []
        chunks = animation_data.split( "\n\n" )
        for chunk in chunks:
            stills.append( Still( chunk , sprite_map , direction ) )
        return stills
        
    def get_largest_dimension( self , stills ):
        dim_x = 0
        dim_y = 0
        for still in stills:
            if still.dimensions[2] > dim_x:
                dim_x = still.dimensions[2]
            if still.dimensions[3] > dim_y:
                dim_y = still.dimensions[3]
        return ( dim_x , dim_y )
        
    def calculate_offset( self , stills ):
        offset_x = 0
        offset_y = 0
        for still in stills:
            offset = still.offset
            if offset[0] > offset_x:
                offset_x = offset[0]
            if offset[1] > offset_y:
                offset_y = offset[1]
        return ( offset_x , offset_y )
            
        
    def save_gif( self , filename ):
        still_imgs = []
        animation_size = ( self.dimension[0] + self.offset[0] , self.dimension[1]+self.offset[1] )
        frame = 0
        for still in self.stills:
            still.adjust_coords( self.offset )
            still_imgs.append( still.create_image( animation_size ) )
            still.create_image( animation_size ).save( "stills\\" + str(frame) + ".png" )
            frame += 1
            
        #for still_img in still_imgs:
            #still_img.show() 
        #gif = Image.new( "RGBA" , ( still_imgs[0].width , still_imgs[0].height ) )
        still_imgs[0].save( filename, format="gif" , save_all=True , append_images=still_imgs[1:], optimize=False , duration=75 , loop=0 , disposal=2 )
            
        



class GaniParser:

    def __init__( self , filename ):
    
        with open( filename , "r" ) as file:
            self.content = file.read()
            self.lines = self.content.splitlines()
            
        #print( len(self.lines) )
        self.lines_parsed = 1 # skip first line, its just "Gani0001"
        
        self.sprite_map = self.get_sprite_map()        
        self.settings = self.get_settings()   
        
        self.animation = self.get_animation( "up" )
        self.animation.save_gif( "coolGif_up.gif" )
        
        self.animation = self.get_animation( "left" )
        self.animation.save_gif( "coolGif_left.gif" )
        
        self.animation = self.get_animation( "down" )
        self.animation.save_gif( "coolGif_down.gif" )
        
        self.animation = self.get_animation( "right" )
        self.animation.save_gif( "coolGif_right.gif" )
        
        
        
        
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
                
    def get_animation( self , direction ):
        match = re.search( "ANI\n.+?ANIEND" , self.content , flags=re.DOTALL ) 
        if match:
            data = match.group(0)
            data = data.lstrip( "ANI" + linesep )
            data = data.rstrip( "ANIEND" + linesep )
            return Animation( data , self.sprite_map , direction )
        return None

    

GaniParser( GANI )
		