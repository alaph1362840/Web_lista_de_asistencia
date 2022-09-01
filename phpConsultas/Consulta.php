<?php
    /**
     * tipo de consulta: 2> para select, insert o update 1> eliminacion
     * datos["datos"] : Filas retornadas
     * datos["se_ejecuto"] : devulve true si no ocurre algun error en la consulta
     */
    class Consulta 
    {
        public $datos = [];
        public $tipo_consulta = 0;
        //para coneccion.
        public $coneccion;
        public $consulta;
        public $sql = "";        

        //crea la coneccion a la base de datos e inicializa los parametros de la clase
        public function __construct($sql, $tipo_consulta) {
            $this->datos["se_ejecuto"] = false;
            $this->datos["hay_datos"] = false;
            $this->datos["datos"]      = [];
            $this->tipo_consulta       = $tipo_consulta;
            $this->sql                 = $sql;            
            //para coneccion:
            $usuario     = "root";
            $pass	     = "";
            $servidor    = "localhost";
            $nombre_base = "listaAsistencia3";
            $this->coneccion = mysqli_connect($servidor,$usuario,$pass)or die('No se puede conectar al servidor');
            mysqli_select_db($this->coneccion,$nombre_base);
            mysqli_set_charset($this->coneccion, "utf8");
        }

        // Ejecuta la consulta y retorna  el arreglo datos con los resultados        
        public function ejecutar_consulta()
        {
            if ($this->tipo_consulta > 0 && $this->sql != "") {                
                $lineas   = Array();
                $i        = 0;           
                $this->consulta = mysqli_query($this->coneccion, $this->sql);
                if ($this->consulta) {
                    $this->datos["se_ejecuto"] = true;
                    if ($this->tipo_consulta==2) {
                        while ($linea=mysqli_fetch_object($this->consulta)) {
                            $lineas[$i]=$linea;
                            $i++;				
                        }
                        if ($i>0) {
                            $this->datos["hay_datos"] = true;
                        }                        
                        $this->datos["datos"] = $lineas;                        
                    }else {
                        $this->datos["datos"] = "no existen datos."; 
                    }                                   
                }               
            }                       
            return $this->datos;                       
        }

        public function limpiarRecursos()
        {
            mysqli_free_result ($this->consulta);
            mysqli_close($this->coneccion); 
        } 
    }
    
?>