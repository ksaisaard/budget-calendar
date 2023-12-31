import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";
import './main.scss';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Day from './Day.js';

// function Day({date, handleShow}) {

//   var transaction1 = round2dec(-5.03);
//   var transaction2 = round2dec(-105.06);
//   var transaction3 = round2dec(120.04);
//   var transaction4 = round2dec(-54.20);
//   var end_amount = round2dec(parseFloat(transaction1) + parseFloat(transaction2) + parseFloat(transaction3) + parseFloat(transaction4));

//   return(
//     <Table className='date_cell' borderless onClick={handleShow}>
//       <tbody>
//         <tr>
//           <td className='date_cells date'>{date}</td>
//           <td className='date_cells date_bill text-end'>-</td>
//         </tr>
//         <tr>
//           <td className='date_cells'>Iced Coffee</td>
//           <td className='date_cells text-end' style={{color: transaction1 < 0 ? "red" : "black"}}>{transaction1}</td>
//         </tr>
//         <tr>
//           <td className='date_cells'>Groceries</td>
//           <td className='date_cells text-end' style={{color: transaction2 < 0 ? "red" : "black"}}>{transaction2}</td>
//         </tr>
//         <tr>
//           <td className='date_cells'>Coco's</td>
//           <td className='date_cells text-end' style={{color: transaction3 < 0 ? "red" : "black"}}>{transaction3}</td>
//         </tr>
//         <tr>
//           <td className='date_cells'>Petrol</td>
//           <td className='date_cells text-end' style={{color: transaction4 < 0 ? "red" : "black"}}>{transaction4}</td>
//         </tr>
//         <tr>
//           <td className='date_cells date_end_amount'></td>
//           <td className='date_cells date_end_amount text-end' style={{color: end_amount < 0 ? "red" : "black"}}>{end_amount}</td>
//         </tr>
//       </tbody>
//     </Table>
//   );
// }

function Main() {
  const [formValues, setFormValues] = useState(
    {
      "2000-01-01": [
        { item: "Tea", amount: "-5"}, 
        { item: "Milk", amount: "-100"}, 
        { item: "Car", amount: "120"}, 
        { item: "Oil", amount: "-5"}
      ],
      "2000-01-02": [
        { item: "asd", amount: "0"}, 
        { item: "Mk", amount: "104"}, 
        { item: "we", amount: "1"}, 
        { item: "sdfds", amount: "-35"}
      ]
    }
    
  )
  const [tempFormValues, setTempFormValues] = useState([])

  const [clickedDate, setClickedDate] = useState()

  const [show, setShow] = useState(false);

  let handleClose = () => {
    setFormValues(tempFormValues);
    alert(JSON.stringify(tempFormValues));
    setShow(false);
  }

  let handleCloseNotSave = () => {
    alert(JSON.stringify(tempFormValues));
    setShow(false);
  }
  
  const handleShow = (e) => {
    setClickedDate(e.target.parentElement.parentElement.parentElement.parentElement.id)
    // console.log(e.target.parentElement.parentElement.parentElement.parentElement.id)
    setTempFormValues(JSON.parse(JSON.stringify(formValues)));
    // console.log(JSON.parse(JSON.stringify(formValues)))
    setShow(true);
  }

  const dates_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37];
  let dates = [];
  let weeks = [];

  let day = 1;
  for (let week= 0; week < 6; week++) {
    for (day; day <= dates_numbers.length; day++) {
      dates.push(<td key={day} onClick={e => handleShow(e)} id={"2000-01-"+String(dates_numbers[day-1]).padStart(2, "0")}><Day transactions={formValues} date={"2000-01-"+String(dates_numbers[day-1]).padStart(2, "0")}></Day></td>);
      if (day % 7 === 0) {
        day++;
        break;
      }
    }
    weeks.push(<tr key={week}>{dates}</tr>);  
    dates = [];
  }

  let handleChange = (i, e) => {
    let newFormValues = JSON.parse(JSON.stringify(tempFormValues));
    const newMapFormValues = tempFormValues[String(clickedDate)].map((currentFormValue, index) => {
      if (index === i) {
        return {
          ...currentFormValue,
          [e.target.name]: e.target.value,
        };
      } else {
        return currentFormValue;
      }
    });
    newFormValues[String(clickedDate)] = newMapFormValues
    setTempFormValues(newFormValues);
  }

  let addFormFields = () => {
      console.log(formValues[String(clickedDate)])
      let newFormValues = JSON.parse(JSON.stringify(tempFormValues));
      if (formValues[String(clickedDate)] === undefined){
        newFormValues[String(clickedDate)] = []
        console.log(newFormValues)
      }
      let dayTransactions = newFormValues[String(clickedDate)]
      let addedTransaction = [...dayTransactions, { item: "", amount: ""}]
      newFormValues[String(clickedDate)] = addedTransaction
      setTempFormValues(newFormValues)
  }

  let removeFormFields = (i) => {
      let newFormValues = JSON.parse(JSON.stringify(tempFormValues));
      newFormValues[String(clickedDate)].splice(i, 1);
      setTempFormValues(newFormValues)
  }
  
  return (
    <>
      <Navbar className="bg-dark-subtle bg-gradient">
        <Container>
          <Navbar.Brand href="#home" className="text-secondary">Budget Calendar</Navbar.Brand>
        </Container>
      </Navbar>
      
      <Modal
        show={show}
        onHide={handleCloseNotSave}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Monday {String(clickedDate)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-auto">
          {tempFormValues[String(clickedDate)]?.map((element, index) => (
            <div className="d-flex flex-row" key={index}>
              <input class="form-control m-1" type="text" placeholder="Item" name="item" value={element.item} onChange={e => handleChange(index, e)} />
              <input class="form-control m-1" type="text" placeholder="Amount" name="amount" value={element.amount} onChange={e => handleChange(index, e)} />
              <IconButton aria-label="delete" onClick={() => removeFormFields(index)}><DeleteIcon fontSize="inherit" /></IconButton>
            </div>       
          ))}       
        </Modal.Body>
        <Modal.Footer>
          <Button className="col-md-3" onClick={addFormFields}>Add</Button>
          <Button variant="primary" className="col-md-3" onClick={handleClose}>Save</Button>
        </Modal.Footer>
      </Modal>
      <Container className="p-3">
        <Table>
          <thead>
            <tr>
              <th><div className="days_of_week">Monday</div></th>
              <th><div className="days_of_week">Tuesday</div></th>
              <th><div className="days_of_week">Wednesday</div></th>
              <th><div className="days_of_week">Thursday</div></th>
              <th><div className="days_of_week">Friday</div></th>
              <th><div className="days_of_week">Saturday</div></th>
              <th><div className="days_of_week">Sunday</div></th>
            </tr>
          </thead>
          <tbody>
            {weeks}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Main;
