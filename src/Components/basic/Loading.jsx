// import { AppImages } from "../../assets/image";

import AppImages from "../../assets/image";

function Loading({ height = "h-[3vh]" }) {
    return (  
        <div className={`${height} block m-auto relative`}>
            <img src={AppImages.loading} alt="loading" className='w-[40px] text-white m-auto block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' />
        </div>
    );
}

export default Loading;