import contactus from '../../assets/contact-us.png';

const ContactUs = () => {

    return (

        <div className="p-5 xsm:p-10">
    

            <div className="text-center space-y-3 mb-10">
                <h2 className="font-bold text-5xl">Contact Us</h2>
                <p className="">Please patiently wait for us to reach out after a request. We will try to contact you in the next 24 - 48 hours. Thank for your patience!</p>
            </div>
    

            <div className="lg:flex   lg:justify-center">
    
  
                <div className=" w-[100%] lg:w-fit ">
                    <img className=" lg:h-[70vh] " src={contactus} alt="" />
                </div>
    

                <div className="space-y-5 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3 lg:max-w-[600px]">
    
                    <div className="bg-[#353535] text-white p-4 text-center space-y-3 lg:pt-10 ">
                        <h2 className="font-bold">CONTACT US</h2>
                        <p className="">We will help you with whatever you need!</p>
                    </div>
    
                    <div className="bg-[#353535] text-white p-4 text-center space-y-3 lg:pt-10">
                        <h2 className="font-bold">EMAIL</h2>
                        <div className="">
                            <a href="">Support@revlearn.com</a>
                            <br />
                            <a href="">Helpme@revlearn.com</a>
                        </div>
                    </div>
    
    
                    <div className="bg-[#353535] text-white p-4 text-center space-y-3 lg:pt-10">
                        <h2 className="font-bold">ADDRESS</h2>
                        <div className="">
                            123 Some Location, Flying Sky, FL 12345
                        </div>
                    </div>
    
                    <div className="bg-[#353535] text-white p-4 text-center space-y-3 lg:pt-10">
                        <h2 className="font-bold">CALL US</h2>
                        <div className="">
                            1(234) 567-890 <br /> 1(234) 567-890
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
    );
};

export default ContactUs;