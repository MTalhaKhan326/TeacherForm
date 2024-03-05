// Electionform.js
import React, { useState } from 'react';
import Modal from "react-modal";
import AppImages from './assets/image';
import axios from 'axios';
import Loading from './Components/basic/Loading';


const Electionform = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalMessage1, setModalMessage1] = useState('');
  const [cnic, setCnic] = useState('');
  const [message, setMessage] = useState('');
  const [response , setResponse] = useState('');
  const [status , setStatus] = useState('');
  const [formdata , setformData] = useState({
    name:'',
    cnic:'',
    phone:''
  })

  const [errors , setErrors] = useState({
    name:'',
    cnic:'',
    phone:''
  })
  
  const [loading, setLoading] = useState(false); // Added loading state
  
  const submitYes = async(e)=>{
     setModalMessage(`آپ کا جواب دینا کا بہت شکریہ`);
    setShowModal(true);
     const apiUrl = `https://cms-managment.vercel.app/election/api/update-log-report/${cnic}`;
      const requestBody = {
         "payment_received": true,
         "interested_in_more_work": true
    };
    await axios.put(apiUrl, requestBody).then(res => {
      console.log("Resss",res.data.message)
    }).catch(e => {
      console.log(e)
    })
  }
  const submitNo = async(e)=>{
    // setModalMessage(`آپ کا جواب دینا کا بہت شکریہ ہم جلد ہی آپ سے رابطہ کریں گے۔`);
    setShowModal1(true);
    const apiUrl = `https://cms-managment.vercel.app/election/api/update-log-report/${cnic}`;
      const requestBody = {
         "payment_received": false,
         "interested_in_more_work": true
    };
    await axios.put(apiUrl, requestBody).then(res => {
      console.log("Resss",res.data.message)
    }).catch(e => {
      console.log(e)
    })
  }
  const submitYess = async(e)=>{
     console.log("Yesss")
     const apiUrl = `https://cms-managment.vercel.app/election/api/update-log-report/${cnic}`;
      const requestBody = {
         "interested_in_more_work": true
    };
    await axios.put(apiUrl, requestBody).then(res => {
      console.log("Resss",res.data.message)
    }).catch(e => {
      console.log(e)
    })
  }
  const submitNoo = async(e)=>{
    console.log("Noooo")
    const apiUrl = `https://cms-managment.vercel.app/election/api/update-log-report/${cnic}`;
      const requestBody = {
         "interested_in_more_work": false
    };
    await axios.put(apiUrl, requestBody).then(res => {
      console.log("Resss",res.data.message)
    }).catch(e => {
      console.log(e)
    })
  }

  const closeModal = () => {
  // window.location.reload();
    setShowModal(false);
    setModalMessage('');
  };
  const closeModal1 = () => {
  // window.location.reload();
    setShowModal1(false);
    // setModalMessage('');
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formdata, [name]: value });
    // setErrors({ ...errors, [name]: '' });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
     setResponse('')
     setMessage('')
     setModalMessage1('')
    if (!cnic) {
      setMessage('Please enter your CNIC.');
      return;
    }

    setLoading(true); // Start loading

    try {
       const statusApi = await axios.get(
        `https://cms-managment.vercel.app/election/api/get-search-logs/${cnic}`
      );
      setStatus(statusApi.data);
      const apiResponse = await axios.get(
        `https://kmmpzxep6g7ktr6zpolod3su3i0mufzk.lambda-url.eu-west-1.on.aws/api/search-in-json-file?cnic=${cnic}`
      );
     
      setResponse(apiResponse.data);
      console.log('API Responseee',apiResponse)
      const apiUrl = "https://cms-managment.vercel.app/election/api/create/search-teacher-logs";
      const requestBody = {
      "cnic": cnic
    };
    axios.post(apiUrl, requestBody).then(res => {
      // console.log("Resss",res)
    }).catch(e => {
      
      console.log(e)
    })
    
      // console.log("Status",statusApi)
    } catch (error) {
      console.error('Error making API call:', error);
      setMessage("Record not found")
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };


   const handleSubmit1 = async (e) => {
    e.preventDefault();

   const newErrors = {};
  Object.keys(formdata).forEach((key) => {
    if (!formdata[key]) {
      newErrors[key] = 'This field is required';
    }
  });

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
    
       setLoading(true); // Start loading
    // Perform API request here
    try {
        console.log("FormDataaa",formdata)
      const apiUrl = "https://cms-managment.vercel.app/election/api/create/search-teacher";
      const requestBody = {
      "name":formdata.name,
      "phone":formdata.phone,
      "cnic": formdata.cnic
    };
    await axios.post(apiUrl, requestBody).then(res => {
      console.log("Resss",res.data.message)
      if(res.data.message){
        // setShowModal1(false);
        setModalMessage1('شکریہ ہماری ٹیم آپ سے جلد رابطہ کرے گی')
        setformData({
        name:'',
        cnic:'',
        phone:''
        })
      }
    }).catch(e => {
      console.log(e)
    })
    } catch (error) {
      console.error('Error making API call:', error);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div className="container mx-auto mt-8">
        
      <form onSubmit={handleSubmit} className="max-w-md mx-auto px-4">
       <div className="flex justify-center">
          <img src={AppImages.ec} alt="" className='mx-auto w-[30%]'/>
       </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="cnic">
            CNIC:
          </label>
          <input
            type="text"
            id="cnic"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your CNIC"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
          />
         
        </div>
        <div className="flex items-center justify-between">
           <button
            type="submit"
            className="bg-green-800 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading} // Disable the button when loading is true
          >
            {loading ? <Loading /> : 'Search'}
          </button>
        </div>
         {message && <p className="text-red-500 text-[16px] italic">{message}</p>}
        </form>
        {
          response === '' ? (''):
          (   
        
             <div className='flex flex-col max-w-md mx-auto px-4 text-left'>
           <div className='flex flex-col py-2'>
             <div className='font-bold text-gray-700 text-[18px]'>Name : </div>
             <div className='text-[18px]'>{response['Name of Officer / Official']}</div>
           </div>
           <div className='flex flex-col py-2'>
             <div className='font-bold text-gray-700 text-[18px]'>Phone number : </div>
             <div className='text-[18px]'>{response['Mobile No.']}</div>
           </div>
           <div className='flex flex-col py-2'>
             <div className='font-bold text-gray-700 text-[18px]'>Cnic : </div>
             <div className='text-[18px]'>{response['CNIC']}</div>
           </div>
           {
            status.hasData ?(    
              ''):( <div>
                        <div className='font-bold text-gray-700 text-[18px] text-right' dir='rtl'>
                          کیا آپ کو آپ کی ادائیگی موصول ہوئی ہے؟
                        </div>
                        <div className='flex flex-row justify-between mx-[70px] my-2'>
                          <div
                          className='bg-red-500 text-white w-[25%] rounded-md text-center font-semibold py-2 cursor-pointer hover:bg-red-400'
                        onClick={submitNo}
                          >
                            نہیں
                          </div>

                            <div className='bg-green-500 text-white w-[25%] rounded-md text-center font-semibold py-2 cursor-pointer hover:bg-green-400'
                          onClick={submitYes}> ہاں</div>
                            
                          </div>
                           <div className='font-bold text-gray-700 text-[18px] text-right mt-7' dir='rtl'> کیا اپ چاہتے ہیں کہ مزید کم وقت کا کام اپ کو دیا جائے
                        </div>
                        <div className='flex flex-row justify-between mx-[70px] my-2'>
                          <div
                          className='bg-red-500 text-white w-[25%] rounded-md text-center font-semibold py-2 cursor-pointer hover:bg-red-400'
                        onClick={submitNoo}
                          >
                            نہیں
                          </div>

                            <div className='bg-green-500 text-white w-[25%] rounded-md text-center font-semibold py-2 cursor-pointer hover:bg-green-400'
                          onClick={submitYess}> ہاں</div>
                            
                          </div>

                        </div>)
           }
        </div>
        )
        }
           <Modal
        isOpen={showModal1}
        onRequestClose={closeModal1}
        contentLabel="Payment S"
        // className="modal"
        // overlayClassName="overlay"
        style={{
          overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '10px',
            marginRight: '10px',
          },
          content: {
            position: 'relative',
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
            maxWidth: '400px',
            width: '100%',
            transform: 'none',
          },
        }}
      >
        {
          modalMessage1 === '' ? ( < form onSubmit={handleSubmit1} className="max-w-md mx-auto px-4" dir='rtl'>
          <div className="mb-4">
           <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
             نام
           </label>
           <input
             type="text"
            id="name"
             name="name"
             placeholder='نام'
             value={formdata.name}
             onChange={handleInputChange}
             className={`w-full p-2 border ${errors.name && 'border-red-500'}`}
           />
           {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
         </div>
         <div className="mb-4" >
           <label htmlFor="cnic" className="block text-gray-700 text-sm font-bold mb-2 " >
             شناختی کارڈ نمبر
           </label>
           <input
             type="text"
             id="cnic"
             name="cnic"
             placeholder='شناختی کارڈ نمبر'
             value={formdata.cnic}
             onChange={handleInputChange}
             className={`w-full p-2 border ${errors.cnic && 'border-red-500'}`}
           />
           {errors.cnic && <p className="text-red-500 text-xs mt-1">{errors.cnic}</p>}
         </div>
         <div className="mb-4">
           <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
             فون نمبر
           </label>
           <input
             type="number"
             id="phone"
             name="phone"
             placeholder='فون نمبر'
             value={formdata.phone}
             onChange={handleInputChange}
             className={`w-full p-2 border ${errors.phone && 'border-red-500'}`}
           />
           {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
         </div>
         <div className="flex items-center justify-between">
           <button
            type="submit"
             className="bg-green-800 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           >
            {loading ? <Loading /> :  'Submit'}
           </button>
         </div>
         </form>):(
          <div className='text-center'>
            <div className='font-semibold text-slate-600 text-[18px]'>{modalMessage1}</div>
          </div>
         )
        }
      
        {/* <div className="text-center"> */}
          {/*  */}
          <button onClick={closeModal1} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-400">
            Close
          </button>
        {/* </div> */}
      </Modal>
       <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Payment S"
        // className="modal"
        // overlayClassName="overlay"
        style={{
          overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '10px',
            marginRight: '10px',
          },
          content: {
            position: 'relative',
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
            maxWidth: '400px',
            width: '100%',
            transform: 'none',
          },
        }}
      >
        <div className="text-center">
          <div className='font-semibold text-slate-600 text-[18px]'>{modalMessage}</div>
          <button onClick={closeModal} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-400">
            Close
          </button>
        </div>
      </Modal>
      
    </div>
  );
};

export default Electionform;