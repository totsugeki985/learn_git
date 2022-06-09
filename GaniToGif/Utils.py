from os import listdir
from os.path import join, isfile , isdir
from PIL import Image, ImageColor

class Utils:

    def __init__(self):
        pass

    @staticmethod
    def get_image( levels_folder , file_name ):
    
        #see if it has a prefix to find the folder such as era/era_bug-net.png
        tokens = file_name.split("_")        
        
        if len( tokens ) > 1:
            file_path = join( join( join( levels_folder  , "images" ) , tokens[0] ) , file_name )        
            if isfile( file_path ): 
                return Image.open( file_path ).convert( "RGBA" )
            
        
        #otherwise check the default folders
        other_folders = listdir( levels_folder )
        for folder in other_folders:
            file_path = join( join( levels_folder , folder ) , file_name )
            if isfile( file_path ):
                return Image.open( file_path ).convert( "RGBA" )
           
        #finally check if the file is in the "missing_images" folder
        file_path = join( "missing_images" , file_name )
        if isfile( file_path ):
            return Image.open( file_path ).convert( "RGBA" )

        #image not found anywhere
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
		
# if __name__ == "__main__":
    # import sys
    # image = Utils.get_image( "E:\Graal\levels" , sys.argv[1] )
    # if len(sys.argv) == 3 and sys.argv[2] == "recolor":
        # image = Utils.set_color( image , { "skin" : "#FFFFFF" } , { "skin" : "#FF0000" } )
    #image.show()
    