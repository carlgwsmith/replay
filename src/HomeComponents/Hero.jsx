export default function Hero(){
    return(<>
    <div className="grid grid-cols-6 h-[400px] bg-[url('/bgHomeHero.png')]">
        <div className="col-span-6 m-auto pt-10 h-[60px]">
        <img src="/logo.png"/>
        </div>
        <div className="col-span-6 text-center font-bold">
        <h3 className="text-white text-[20px]">946 MASSACHUSETTS STREET <span className="font-light">|</span> LAWRENCE, KS <span className="font-light">|</span> 5PM-2AM EVERYDAY</h3>
        </div>
    </div>
    </>)
}