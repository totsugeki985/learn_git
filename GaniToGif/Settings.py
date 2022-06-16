

class Settings:
    
    def __init__( self , settings_data ):
        self.loop = False
        self.continuous = False
        self.single_direction = False
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
        #
        setattr( self , attr_name , string )
        
     #there can be multiple PLAYSOUNDS
    def parse_settings_data( self , settings_data ):
    
        # uses tuple[0] to call function with tuple[1] as the name of attribute to set
        switch_map = \
        {
            "LOOP" : ( self.setTrue , "loop" ) ,
            "CONTINUOUS" : ( self.setTrue , "continuous" ) ,
            "SINGLEDIRECTION" : ( self.setTrue , "single_direction" ) ,
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
                
                continue
            
            function , attr_name = two_tuple
            function( attr_name , tokens[1] )
            #

    def __str__( self ):
        string =  self.__class__.__name__ + "\n(\n"
        for name , value in vars(self).items():
            string += "\t" + str(name) + "=" + str(value) + "\n"
        return string + ")"
        
# if __name__ == "__main__":
    # import re
    # import sys
    # with open( sys.argv[1] , "r" ) as gani_file:
        # contents = gani_file.read()
        # match = re.search( "\n\n.+?\n\n" , contents , re.DOTALL )
        