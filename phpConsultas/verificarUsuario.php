<?php
	if (!isset($_SESSION['id_usuario'])) {
        header('location: login.html');
    }else{
		if ($_SESSION['id_usuario'] =='' || $_SESSION['id_usuario'] ==-1 || $_SESSION['habilitado']==false) {
			header('location: login.html');
		} 
	}	 
?>