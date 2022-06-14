from PySide6.QtCore import Qt, QRect
from PySide6.QtWidgets import QWidget , QPushButton , QHBoxLayout, QColorDialog
from PySide6.QtGui import QPainter, QPen, QBrush

class MyColorPicker(QWidget):
	
    #whatever who cares for margins and all that crap... it draws a rectangle!
    def __init__( self , button_name , default_color , *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.current_color = default_color
        
        self.layout = QHBoxLayout()
        self.layout.setAlignment( Qt.AlignCenter )
        
        self.button = QPushButton( button_name )
        self.button.clicked.connect( self.choose_color )
        
        self.layout.addWidget( self.button )
        #self.layout.addStretch() #stops button from expanding
        
        self.setMaximumHeight( 50 )
        
        self.setLayout( self.layout )
                
        
    def choose_color( self ):
        color = QColorDialog.getColor( self.current_color )
        if color.isValid(): #if they chose a color instead of just closijng window
            self.current_color = color
    
    
    def setEnabled( self , boolean ):
        self.button.setEnabled( boolean )
        
    def colorContents( self ):
        painter = QPainter( self )
        painter.setPen( QPen( self.current_color ,  5, Qt.SolidLine) )
        painter.setBrush(QBrush( self.current_color , Qt.SolidPattern) )
        painter.begin( self )
        painter.drawRect( self.contentsRect() )#self.rectangle_size[0] , self.rectangle_size[1] ) )
        painter.end()
        
    def paintEvent( self , event ):
        self.colorContents()
