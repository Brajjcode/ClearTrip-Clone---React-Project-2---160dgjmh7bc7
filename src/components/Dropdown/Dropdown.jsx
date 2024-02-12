import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Dropdownjsx(props) {
  function changedvalue(selectedKey){

    props.onselectoption(selectedKey);
       
  } 

  return (
      
   <>

     <Dropdown onSelect={changedvalue}>
      <Dropdown.Toggle id="dropdown-basic" className=' bg-red-800'>
        {props.name}
      </Dropdown.Toggle>
     
     
      <Dropdown.Menu >
        <Dropdown.Item eventKey={props.value1}>{props.item1}</Dropdown.Item>
        <Dropdown.Item eventKey={props.value2}>{props.item2}</Dropdown.Item>
             {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
       </Dropdown.Menu>


    </Dropdown> 

{/* 
    <NavDropdown
              id="nav-dropdown-dark-example"
              title="Dropdown"
              menuVariant="dark"
              onSelect={changedvalue}
            >
              <NavDropdown.Item href="#action/3.1"eventKey={props.value1}>{props.item1}</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" eventKey={props.value2}> {props.item2}</NavDropdown.Item>
                
             
             
            </NavDropdown> */}
    </> 
    
  );
}

export default Dropdownjsx;