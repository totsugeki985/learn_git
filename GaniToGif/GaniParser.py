from Utils import Utils
from Config import Config
from Sprite import Sprite
from Animation import Animation
from Settings import Settings

import sys
import re
from os import linesep
from os.path import split

class GaniParser:

    def __init__( self , config_filepath , gani_filepath ):
    
        self.config = Config( config_filepath )
        self.parse_gani( gani_filepath )
    
    def __init__( self , config , gani_filepath ):
        self.config = config
        self.parse_gani( gani_filepath )
        
    def parse_gani( self , gani_filepath ):
        with open( gani_filepath , "r" ) as file:
            self.content = file.read()
            self.lines = self.content.splitlines()
            
        #
        self.lines_parsed = 1 # skip first line, its just "Gani0001"
        
        self.sprite_map = self.get_sprite_map()        
        self.settings = self.get_settings() 
        
    def get_sprite_map( self ):
        sprite_map = {}

        for x in range( self.lines_parsed , len(self.lines) ):
            self.lines_parsed += 1
            
            if self.lines[x][0:6] == "SPRITE":
                sprite = Sprite( self.config , self.lines[x] )
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
            return Animation( data , self.sprite_map , direction , self.settings.single_direction )
        return None

    def save_gif( self , filename ):
        files_created = []
        if self.settings.single_direction:
            filename = filename + ".gif"
            animation = self.get_animation( "remove this param" )
            animation.save_gif( filename )
            files_created.append( filename )
        else:
            directions = [ "up" , "left" , "down" , "right" ]
            for direction in directions:
                filename = filename + "_" + direction + ".gif" 
                animation = self.get_animation( direction )
                animation.save_gif( filename )
                files_created.append( filename )
        return files_created

if __name__ == "__main__":
    if len(sys.argv) < 4:        
        exit(1)
        
    parser = GaniParser( sys.argv[1] , sys.argv[2] )
    parser.save_gif( sys.argv[3] )