from os.path import join, expanduser

class Config:

    #for command line
    def __init__( self , config_filepath ):
        #default assets to be used, overwritten after parsing config if sprite_type present
        self.default_colors = \
        {
            "skin" : "#FFAD6B" ,  #orange
            "coat" : "#FFFFFF" , #white
            "belt" : "#0000FF" , #blue
            "shoes" :  "#CE1829"  , #fire engine red
            "sleeves" : "#FF0000" #red
        }
        self.colors = {}
        
        self.graal_folder = join( expanduser("~") , "Graal" )
        
        self.parse_config( config_filepath ) #overwrites sel;f.graal_folder if specified in config.txt, else its in the User's root folder   
        
        self.set_folderpaths()
        
    #for gui
    def __init__( self , graal_folder , colors , head , body , attr1 ):
        self.default_colors = \
        {
            "skin" : "#FFAD6B" ,  #orange
            "coat" : "#FFFFFF" , #white
            "belt" : "#0000FF" , #blue
            "shoes" :  "#CE1829"  , #fire engine red
            "sleeves" : "#FF0000" #red
        }
        self.graal_folder = graal_folder
        self.colors = colors
        self.head = head
        self.body = body
        self.attr1 = attr1
        self.set_folderpaths()
        
    def set_folderpaths( self ):
        self.levels_folder = join( self.graal_folder , "levels" )
        self.images_folder = join( self.levels_folder , "images" )
        self.bodies_folder = join( self.levels_folder , "bodies" )
        self.heads_folder = join( self.levels_folder , "heads" )
        self.shields_folder = join( self.levels_folder , "shields" )
        self.hats_folder = join( self.levels_folder , "hats" )
        self.emoticons_folder = join( self.levels_folder , "emoticons" )
        self.downloads_folder = join( self.levels_folder , "downloads" )
        
    def parse_config(self , config_filepath):
        parse_map = \
        {
            "graal_folder" : setattr ,
            "head" : setattr ,
            "body" : setattr ,
            "attr1" : setattr ,
            "attr2" : setattr ,
            "attr3" : setattr ,
            "param1" : setattr ,
            "param2" : setattr ,
            "param3" : setattr ,
            "colors" : self._parse_colors
        }
        with open( config_filepath , "r" ) as config_file:
            lines = config_file.readlines()
            
        for line in lines:
        
            tokens = line.split("=")
            
            if len(tokens) < 2:
                continue
                
            function = parse_map.get( tokens[0] )
            if function is None:
                continue
            
            function( self , tokens[0] , tokens[1].rstrip("\n") )
            
    def _parse_colors( self , rawr , dummy , color_string ):
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
        
if __name__ == "__main__":
    print( Config("configs/config.txt") )