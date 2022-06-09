import re
from PIL import Image 

class Still:

    def __init__( self , still_data , sprite_map , direction , single_direction=False ):
        self.single_direction = single_direction
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
        #
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
        
        if self.single_direction:
            matches = re.findall( "-?[0-9]+\s+-?[0-9]+\s+-?[0-9]+" , still_data )
        else:
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
            
            #
            #
            
            if sprite_img is None:
                continue
                
            still_img.paste( sprite_img , ( coord[0] , coord[1] ) , mask=sprite_img)#, coord[0] + 20 , coord[1] + 20 ) )
        #still_img.save( "stills\\backdrop_sprite_pasted.png" )
        return still_img
        
    
    def __str__( self ):
        return "Still( sprite_coords={} ,\nlength={} , sound_file={} , offset={} , dimensions={})".format( self.sprite_coords , self.length , \
        self.sound_file , self.offset , self.dimensions )