<?php
	if (!isset($_SESSION['id_usuario'])) {
        header('location: login.html');
    }else{
		if ($_SESSION['id_usuario'] =='' || $_SESSION['id_usuario'] ==-1 || $_SESSION['habilitado']==false) {
			header('location: login.html');
		}else{
			if ($_SESSION['autoridad'] == "baja" && ($_SESSION['pag']==2 || $_SESSION['pag']==3 )) {
				header('location: 01_Grados1.php');
			}
		} 
	}	 
?>