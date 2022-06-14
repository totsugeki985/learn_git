from PySide6.QtGui import *
from PySide6.QtCore import Qt , QRect, SIGNAL 
from PySide6.QtWidgets import *
from sys import argv, exit
from os.path import expanduser , join
from os import listdir, scandir , remove
from shutil import copyfile 

from MyColorPicker import MyColorPicker
from GaniParser import GaniParser
from Config import Config

class Gui(QWidget):
    
    def __init__( self ):
        super().__init__()
        self.color_buttons = []
        self.graal_home_start = expanduser("~")
        self.dostuff()
        
    def dostuff( self ):
        self.v_layout = QVBoxLayout( self )
        
        self.graal_h_layout = QHBoxLayout()
        self.graal_home_button = QPushButton( "Select Graal Folder" )
        self.graal_line_edit = QLineEdit( "" )
        self.graal_line_edit.setEnabled( False ) #makes line edit uneditable by typing
        self.connect_choose_folder( self.graal_home_button , self.graal_line_edit , "Select Graal folder" , self.graal_home_start )
        
        self.graal_h_layout.addWidget( self.graal_home_button )
        self.graal_h_layout.addWidget( self.graal_line_edit )
        
        self.gani_h_layout = QHBoxLayout()
        self.gani_button = QPushButton( "Select Gani" )
        self.gani_line_edit = QLineEdit( "" )        
        self.gani_line_edit.setEnabled( False ) #makes line edit uneditable by typing
        self.connect_choose_file( self.gani_button , self.gani_line_edit , "Select Gani" , self.graal_home_start , "Ganis ( *.gani )" )
        
        self.gani_h_layout.addWidget( self.gani_button )
        self.gani_h_layout.addWidget( self.gani_line_edit )
        
        self.hat_h_layout = QHBoxLayout()
        self.hat_button = QPushButton( "Select Hat" )
        self.hat_line_edit = QLineEdit( "" )        
        self.hat_line_edit.setEnabled( False ) #makes line edit uneditable by typing
        self.connect_choose_file( self.hat_button , self.hat_line_edit , "Select Hat" , self.graal_home_start , "Image File ( *.png *.jpg *.jpeg *.mng *.gif)" )
        
        self.hat_h_layout.addWidget( self.hat_button )
        self.hat_h_layout.addWidget( self.hat_line_edit )
        
        self.head_h_layout = QHBoxLayout()
        self.head_button = QPushButton( "Select Head" )
        self.head_line_edit = QLineEdit( "" )        
        self.head_line_edit.setEnabled( False ) #makes line edit uneditable by typing
        self.connect_choose_file( self.head_button , self.head_line_edit , "Select Head" , self.graal_home_start , "Image File ( *.png *.jpg *.jpeg *.mng *.gif)" )
        
        self.head_h_layout.addWidget( self.head_button )
        self.head_h_layout.addWidget( self.head_line_edit )
        
        self.body_h_layout = QHBoxLayout()
        self.body_button = QPushButton( "Select Body" )
        self.body_line_edit = QLineEdit( "" )        
        self.body_line_edit.setEnabled( False ) #makes line edit uneditable by typing
        self.connect_choose_file( self.body_button , self.body_line_edit , "Select Body" , self.graal_home_start , "Image File ( *.png *.jpg *.jpeg *.mng *.gif)" )
        
        self.body_h_layout.addWidget( self.body_button )
        self.body_h_layout.addWidget( self.body_line_edit )
        
        
        
        self.colors_h_layout = QHBoxLayout()
        self.color_checkbox = QCheckBox( "Set colors" )
        self.color_checkbox.setMaximumWidth( 80 )
        self.color_checkbox.stateChanged.connect( self.setColorState )
        
        self.skin_picker = MyColorPicker( "Skin" , QColor.fromRgb( 255 , 173 , 107 ) ) #orange
        self.coat_picker = MyColorPicker( "Coat" , QColor.fromRgb( 255 , 255 , 255 ) ) #white
        self.sleeves_picker = MyColorPicker( "Sleeves" , QColor.fromRgb( 255  , 0 , 0 ) ) #red
        self.shoes_picker = MyColorPicker( "Shoes" , QColor.fromRgb( 206 , 24 , 41 ) ) #dark red
        self.belt_picker = MyColorPicker( "Belt" , QColor.fromRgb( 0 , 0 , 255 ) ) #blue
        self.skin_picker.setEnabled( False )
        self.coat_picker.setEnabled( False )
        self.sleeves_picker.setEnabled( False )
        self.shoes_picker.setEnabled( False )
        self.belt_picker.setEnabled( False )
        
        self.colors_h_layout.addWidget( self.color_checkbox )
        self.colors_h_layout.addWidget( self.skin_picker )
        self.colors_h_layout.addWidget( self.coat_picker )
        self.colors_h_layout.addWidget( self.sleeves_picker )
        self.colors_h_layout.addWidget( self.shoes_picker )
        self.colors_h_layout.addWidget( self.belt_picker )
        
        self.preview_h_layout = QHBoxLayout()
        self.preview_h_layout.setAlignment( Qt.AlignCenter )
        self.preview_h_layout.addWidget( QLabel( "Preview" ) )
        
        self.save_h_layout = QHBoxLayout()
        self.preview_button = QPushButton("Generate Preview")
        self.save_button = QPushButton( "Save Gif" )
        
        self.preview_button.clicked.connect( self.generate_preview )
        self.save_button.clicked.connect( self.save_gif )
        
        self.save_h_layout.addWidget( self.preview_button )
        self.save_h_layout.addWidget( self.save_button )
        
        # self.preview_layout = QHBoxLayout()
        # self.movie_label = QLabel()
        # self.movie = QMovie( "C:\\Users\\Christopher Serio\\Code\\learn_git\\GaniToGif\\gifs\\era_fart_battousai.gif" )
        # self.movie_label.setMovie( self.movie )
        # self.movie.start()
        
        # self.preview_layout.addWidget( self.movie_label )
        
 

        
        
        self.v_layout.addLayout( self.graal_h_layout )
        self.v_layout.addLayout( self.gani_h_layout )
        self.v_layout.addLayout( self.hat_h_layout )
        self.v_layout.addLayout( self.head_h_layout )
        self.v_layout.addLayout( self.body_h_layout )
        self.v_layout.addLayout( self.colors_h_layout )
        self.v_layout.addLayout( self.preview_h_layout )
        self.v_layout.addLayout( self.save_h_layout )

    def clearLayout( self , layout ):
        while layout.count():
            child = layout.takeAt(0)
            if child.widget():
                child.widget().deleteLater()
       
    def delete_temp_files( self ):
        dir = "./temp"
        for file in scandir(dir):
            remove(file.path)
       
    def generate_preview( self ):
        
        temp_filenames = self.save_temp_gif()

        self.clearLayout( self.preview_h_layout )
        
        for filename in temp_filenames:
            preview_label = QLabel()
            movie = QMovie( filename ) 
            preview_label.setMovie( movie )
            self.preview_h_layout.addWidget( preview_label )
            preview_label.show()
            movie.start()

    def save_temp_gif( self ):
        if self.color_checkbox.isChecked():
            colors = \
            {
                "skin" : self.skin_picker.current_color.name() ,
                "coat" : self.coat_picker.current_color.name() ,
                "belt" : self.belt_picker.current_color.name() , 
                "shoes" : self.shoes_picker.current_color.name() ,
                "sleeves" : self.sleeves_picker.current_color.name()
            }
        else:
            colors = {}
                    
        config = Config( self.graal_line_edit.text() , colors , self.head_line_edit.text() , self.body_line_edit.text() , self.hat_line_edit.text() )
        parser = GaniParser( config , self.gani_line_edit.text() )
        temp_filenames = parser.save_gif( "./temp/temp_gif" )
        
        return temp_filenames 
        
    def save_gif( self ):
        temp_filenames = self.save_temp_gif()
        save_name = QFileDialog.getSaveFileName( self , "Save Gif" , "~" , "Image ( *.gif )" )[0]
        print( save_name )
        if len(temp_filenames) == 1:
            print( "saving single direction gani" )
            copyfile( temp_filenames[0] , save_name )
        else:
            save_name = save_name.rstrip( ".gif" )
            directions = ["up","left","down","right"]
            for x in range( len(temp_filenames) ):
                copyfile( temp_filenames[x] , save_name + "_" + directions[x] + ".gif" )
        
    def setColorState( self , state ):
        print( state )
        boolean = False
        if state == 2:
            boolean = True
        self.skin_picker.setEnabled( boolean )
        self.coat_picker.setEnabled( boolean )
        self.sleeves_picker.setEnabled( boolean )
        self.shoes_picker.setEnabled( boolean )
        self.belt_picker.setEnabled( boolean )

        
    def connect_choose_folder( self , button , line_edit , window_name , start_dir ):
        self.connect( button , SIGNAL("clicked()") , \
                      lambda window_name=window_name , start_dir=start_dir , \
                             line_edit=line_edit: self.choose_folder(window_name , start_dir , line_edit) )
    
    
    def choose_folder( self , window_name , start_dir , line_edit ):
        folder = QFileDialog.getExistingDirectory( self , window_name , start_dir , QFileDialog.ShowDirsOnly )
        if folder != "":
            line_edit.setText( folder )
    
    
    def connect_choose_file( self , button , line_edit , window_name , start_dir , file_filter ):
        self.connect( button , SIGNAL("clicked()") , \
                      lambda window_name=window_name , start_dir=start_dir , \
                             file_filter=file_filter , line_edit=line_edit : \
                      self.choose_file(window_name , start_dir , file_filter , line_edit) )
    
    def choose_file( self , window_name , start_dir , file_filter , line_edit ):
        fileName = QFileDialog.getOpenFileName( self , window_name , start_dir , file_filter )[0]
        if fileName != "": #prevents erasing files already chosen when x clicked
            line_edit.setText( fileName )
            
            

if __name__ == "__main__":
    app = QApplication([])
    widget = Gui()
    widget.resize(800, 400)
    widget.show()
    exit(app.exec())