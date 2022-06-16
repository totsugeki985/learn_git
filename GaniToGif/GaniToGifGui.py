from PySide6 import QtCore, QtGui
from PySide6.QtWidgets import QApplication, QWidget , QHBoxLayout , QVBoxLayout , QLabel , QFileDialog, QPushButton, QLineEdit

import sys

class MyWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.create_gui()

    def create_gui(self):
        self.layout = QVBoxLayout( self )
        
        self.layout.addLayout( self.getGaniPicker( self.layout ) )
        

    def selectGani( self ):
        filename = QFileDialog.getOpenFileName( self , "Select GANI" , "C:\\Users" , "GANI files( *.gani )" )[0]
        self.gani_lineEdit.setText( filename )
        
        
    def getGaniPicker( self , parent ):
        hLayout = QHBoxLayout()
        self.gani_select = QPushButton( "Select GANI" )
        self.gani_lineEdit = QLineEdit()   
   
            
        self.gani_select.clicked.connect( self.selectGani )
        
        hLayout.addWidget( self.gani_select )
        hLayout.addWidget( self.gani_lineEdit )
        
        return hLayout
        
if __name__ == "__main__":
    app = QApplication([])

    widget = MyWidget()
    widget.resize(800, 600)
    widget.show()

    sys.exit(app.exec())

