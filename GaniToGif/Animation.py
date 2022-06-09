from Still import Still

import re
from PIL import Image 

class Animation:
    
    def __init__( self , animation_data , sprite_map , direction , single_direction ):
        self.single_direction = single_direction
        self.direction = direction
        self.stills = self.get_stills( animation_data , sprite_map , direction )
        self.dimension = self.get_largest_dimension( self.stills )
        self.offset = self.calculate_offset( self.stills )
        #

        
    def get_stills( self , animation_data , sprite_map , direction ):
        stills = []
        chunks = animation_data.split( "\n\n" )
        for chunk in chunks:
            print( chunk +"\n-------------------------------")
            stills.append( Still( chunk , sprite_map , direction , self.single_direction) )
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