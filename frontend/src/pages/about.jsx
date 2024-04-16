import img from '../assets/human.jpg'
import img2 from '../assets/human2.png'
export default function About(){
    return (
        <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">About Me</h2>
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
              <img
                src={img}
                alt="my Photograph"
                className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
                />
            </div>

              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">台灣大學，機械所，鄭國彬</h2>
              <p className="mt-6 text-center leading-8 text-gray-900 ">
              welcome! 我是台大學生，目前就讀機械所，這是我的網絡攻防課程的網站，做到快往生了，最近學車都學到心態炸開了，只求放過一下。
               </p>
              <img
                src={img2}
                alt="my Photograph"
                className= "h-72  object-cover object-right md:object-center"
                />

        </div>
    );
}

