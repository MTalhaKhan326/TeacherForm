// Electionform.js
import React, { useState } from 'react';
import Modal from "react-modal";
import AppImages from './assets/image';
import axios from 'axios';
import Loading from './Components/basic/Loading';
import FlutterInterface from './utils/flutter_interface';
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";


const Electionform = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalMessage1, setModalMessage1] = useState('');
  const [modalForm, setModalForm] = useState('');
  const [cnic, setCnic] = useState('');
  const [message, setMessage] = useState('');
  const [response , setResponse] = useState('');
  const [status , setStatus] = useState('');
  const [formdata , setformData] = useState({
    name:'',
    cnic:'',
    phone:'',
    city:'',
  })

  const [errors , setErrors] = useState({
    name:'',
    cnic:'',
    phone:'',
    city:''
  })
  const [formdata1 , setformData1] = useState({
    name:'',
    cnic:'',
    phone:'',
    
  })

  const [errors1 , setErrors1] = useState({
    name:'',
    cnic:'',
    phone:'',
  })
  
  const [loading, setLoading] = useState(false); // Added loading state

   const [government, setGovernment] = useState('');
  const [subButtons, setSubButtons] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = () => {
    console.log("Heartttttt Favourite")
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };
  const handleHeartClick1 = () => {
    console.log("Heartttttt UnFavourite")
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  const handleGovernmentClick = (governmentName) => {
    // Define sub-buttons based on the selected government
    let buttons = [];
    if (governmentName === 'Punjab Government') {
      buttons = [
        { name: 'NADRA', url: 'https://www.nadra.gov.pk/national-identity-card/' },
        { name: 'Passport', url: 'https://onlinemrp.dgip.gov.pk/' },
        { name: 'Election', url: 'https://ecp.gov.pk/general-elections-2024' },
        { name: 'Education', url: 'https://punjab.gov.pk/boards_punjab' },
        { name: 'Driving License', url: 'https://dlims.punjab.gov.pk/elicense' },
      ];
    } else if (governmentName === 'Sindh Government') {
      buttons = [
        { name: 'NADRA', url: 'https://www.nadra.gov.pk/national-identity-card/' },
        { name: 'Passport', url: 'https://onlinemrp.dgip.gov.pk/' },
        { name: 'Election', url: 'https://ecp.gov.pk/general-elections-2024' },
        { name: 'Education', url: 'https://www.bsek.edu.pk/' },
      ];
    }else if (governmentName === 'KPK Government') {
      buttons = [
        { name: 'NADRA', url: 'https://www.nadra.gov.pk/national-identity-card/' },
        { name: 'Passport', url: 'https://onlinemrp.dgip.gov.pk/' },
        { name: 'Election', url: 'https://ecp.gov.pk/general-elections-2024' },
        { name: 'Education', url: 'https://kpese.gov.pk/category/notifications/' },
      ];
    }
    else if (governmentName === 'Balochistan Government') {
      buttons = [
        { name: 'NADRA', url: 'https://www.nadra.gov.pk/national-identity-card/' },
        { name: 'Passport', url: 'https://onlinemrp.dgip.gov.pk/' },
        { name: 'Election', url: 'https://ecp.gov.pk/general-elections-2024' },
        { name: 'Education', url: 'http://www.emis.gob.pk/website/Default.aspx' },
      ];
    }
    // Update state to show sub-buttons
    setGovernment(governmentName);
    setSubButtons(buttons);
  };
  
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
    setModalMessage(`اپ کا جواب دینے کا بہت شکریہ اپ کو اس کے متعلق جلد اگاہ کر دیا جائے گا`);
    //  setModalMessage(`آپ کا جواب دینا کا بہت شکریہ`);
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
   
  const submitListYes = async(e)=>{
    // setModalMessage(`آپ کا جواب دینا کا بہت شکریہ ہم جلد ہی آپ سے رابطہ کریں گے۔`);
    setShowModal2(true);
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
     
     setModalMessage(`آپ کا جواب دینا کا بہت شکریہ`);
    setShowModal(true);
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
    
     setModalMessage(`آپ کا جواب دینا کا بہت شکریہ`);
    setShowModal(true);
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
  const closeModal2 = () => {
  // window.location.reload();
    setShowModal2(false);
    // setModalMessage('');
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formdata, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };
  const handleInputChange1 = (e) => {
  const { name, value } = e.target;
  setformData1({ ...formdata1, [name]: value });
  setErrors1({ ...errors1, [name]: '' }); // You may want to clear errors when the input changes
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
      setModalForm('open')
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
      "cnic": formdata.cnic,
      "city":formdata.city
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

  const handleSubmitform = async (e) => {
    e.preventDefault();
    console.log("Hiiiiiiiii")

   const newErrors = {};
  //  Object.keys(formdata1).forEach((key) => {
  //   if (!formdata1[key]) {
  //     newErrors[key] = 'This field is required';
  //     console.log("Errror")
  //   }
  // });

  if (Object.keys(newErrors).length > 0) {
    setErrors1(newErrors);
    return;
  }
    
       setLoading(true); // Start loading
    // Perform API request here
    try {
        console.log("FormDataaa",formdata1)
      const apiUrl = "https://cms-managment.vercel.app/election/api/create/search-teacher";
      const requestBody = {
      "name":formdata1.name,
      "phone":formdata1.phone,
      "cnic": formdata1.cnic,
      "city":''
    };
    await axios.post(apiUrl, requestBody).then(res => {
      console.log("Resss",res.data.message)
      if(res.data.message){
        // setShowModal1(false);
        setModalMessage1('شکریہ ہماری ٹیم آپ سے جلد رابطہ کرے گی')
        setformData1({
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
  const handleMapClick = (lat ,lng) => {
      console.log("lat",lat, "lng",lng)
       FlutterInterface.goToMap(lat , lng);
    };
   const handleButtonClick = (phone) => {
      console.log("phoneee",phone)
       FlutterInterface.openDialer(phone);
    };
  return (
    <div className="container mx-auto mt-8">
        
      <form onSubmit={handleSubmit} className="max-w-md mx-auto px-4">
        <div className='w-full flex flex-row'>
          <div className='w-[80%] '>
             <div className="flex flex-col my-6">
          {/* <img src={AppImages.ec} alt="" className='mx-auto w-[30%]'/> */}
          <div className='text-green-800 font-bold text-[25px]'>
            Election Comission 
          </div>
          <div className='text-green-800 font-bold text-[25px]'>
            Payments Update 
          </div>
          
       </div>
          </div>
          <div className='w-[20%] flex flex-col'>
               <div
                    className=" rounded-full bg-green-800 ml-7 my-7 mb-3 w-8 h-8 cursor-pointer"
                    onClick={() => handleButtonClick('+92 42 99210621')}
                  >
                    <img
                      src={AppImages.phone}
                      alt=""
                      
                      className="rounded-full w-[60%] ml-[6px] mt-[6px] text-white"
                      style={{ filter: "brightness(5) invert(1)" }}
                    />
                  </div>
                  <div>
                    {isLiked ? <MdOutlineFavorite style={{
          fontSize: '33px',
          color: isLiked ? 'red' : 'transparent',
          cursor: 'pointer',
          marginLeft:"27px"
                      }} onClick={handleHeartClick1}/> : <MdFavoriteBorder style={{
                        fontSize: '33px',
                        // color: isLiked ? 'red' : 'transparent',
                        cursor: 'pointer',
                        marginLeft:"27px"
                      }}  onClick={handleHeartClick}/>}
               
                  </div>
                  <div>
                    <FaMapMarkerAlt style={{
                      fontSize: '33px',
                      // color: isLiked ? 'red' : 'transparent',
                      cursor: 'pointer',
                      marginLeft:"27px",
                      marginTop:"6px"
                      }} onClick={()=>handleMapClick('31.5626183','74.3015855')}/>
                  </div>
                  
          </div>
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
         {message &&
          <div>
            <p className="text-red-500 text-[16px] italic">{message}</p>
            {
              modalForm === 'open' ? (<div>
                    <div className='font-bold text-gray-700 text-[18px] text-right' dir='rtl'>
                          اگر آپ کا نام سرچ میں شو نہیں ہو رہا تو یہاں کلک کریں؟  <span className='text-blue-600 font-semibold hover:text-blue-500 ' onClick={submitListYes}>ClickHere</span> 
                        </div>
                        {/* <div className='flex flex-row justify-between mx-[70px] my-2'>
                          <div
                          className='bg-red-500 text-white w-[25%] rounded-md text-center font-semibold py-2 cursor-pointer hover:bg-red-400'
                        onClick={submitListNo}
                          >
                            نہیں
                          </div>

                            <div className='bg-green-500 text-white w-[25%] rounded-md text-center font-semibold py-2 cursor-pointer hover:bg-green-400'
                          > ہاں</div>
                            
                          </div> */}
              </div>):('')
            }
            
         
         </div>}
        </form>
        {
          response === '' ? (<div> <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-[40px]">
        <div className=" text-blue-500 p-2 font-bold text-[18px] hover:text-blue-400" onClick={() => handleGovernmentClick('Punjab Government')}>
           Punjab Government
        </div>
        <div className=" text-blue-500 p-2 font-bold text-[18px] hover:text-blue-400" onClick={() => handleGovernmentClick('Sindh Government')}>
          Sindh Government
        </div>
        <div className=" text-blue-500 p-2 font-bold text-[18px] hover:text-blue-400" onClick={() => handleGovernmentClick('KPK Government')}>
          KPK Government
        </div>
        <div className=" text-blue-500 p-2 font-bold text-[18px] hover:text-blue-400" onClick={() => handleGovernmentClick('Balochistan Government')}>
          Balochistan Government
        </div>
        {/* Add buttons for other governments */}
      </div>

      {subButtons.length > 0 && (
        <div className="mt-4">
          <p className="text-lg font-bold mx-3">{government} Service Institutes:</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
            {subButtons.map((button, index) => (
              <button key={index} className="bg-green-800 text-white p-2 mx-3 rounded-md" onClick={() => window.location.href = button.url}>
                {button.name}
              </button>
            ))}
          </div>
        </div>
      )}</div>):
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
                           <div className='font-bold text-gray-700 text-[18px] text-right mt-7' dir='rtl'> کیا اپ مستقبل میں الیکشن کمیشن کے لیے مزید کام کرنا چاہیں گے
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
          modalMessage1 === '' ? ( 
          < form onSubmit={handleSubmitform} className="max-w-md mx-auto px-4" dir='rtl'>
          <div className="mb-4">
           <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
             نام
           </label>
           <input
             type="text"
            id="name"
             name="name"
             placeholder='نام'
             value={formdata1.name}
             onChange={handleInputChange1}
             className={`w-full p-2 border ${errors1.name && 'border-red-500'}`}
           />
           {errors1.name && <p className="text-red-500 text-xs mt-1">{errors1.name}</p>}
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
             value={formdata1.cnic}
             onChange={handleInputChange1}
             className={`w-full p-2 border ${errors1.cnic && 'border-red-500'}`}
           />
           {errors1.cnic && <p className="text-red-500 text-xs mt-1">{errors1.cnic}</p>}
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
             value={formdata1.phone}
             onChange={handleInputChange1}
             className={`w-full p-2 border ${errors1.phone && 'border-red-500'}`}
           />
           {errors1.phone && <p className="text-red-500 text-xs mt-1">{errors1.phone}</p>}
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
        <Modal
        isOpen={showModal2}
        onRequestClose={closeModal2}
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
         <div className="mb-4">
           <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
              شہر
           </label>
           <input
             type="text"
             id="city"
             name="city"
             placeholder=' شہر'
             value={formdata.city}
             onChange={handleInputChange}
             className={`w-full p-2 border ${errors.city && 'border-red-500'}`}
           />
           {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
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
          <button onClick={closeModal2} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-400">
            Close
          </button>
        {/* </div> */}
      </Modal>
      
    </div>
  );
};

export default Electionform;