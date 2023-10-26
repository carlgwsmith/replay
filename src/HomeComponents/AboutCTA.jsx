export default function AboutCTA(){
    return(<>
    <div className="grid grid-cols-6 h-[400px] bg-[url('/homeCTAbg.jpg')] bg-cover">
        <div className="col-span-6 m-auto pt-10 text-center">
        <h2 className="text-[42px] font-bold">SINCE 1993</h2>
        <h4 className="text-[18px] font-medium tracking-[3px]">ABOUT OUR HISTORY</h4>
        </div>
        <div className="col-span-4 col-start-2 text-center font-bold">
            <button className="hover:bg-slate-400 py-4 px-6 rounded-md bg-slate-300 text-jet border-2 border-jet shadow-md ease-in-out">ABOUT REPLAY</button>
        </div>
    </div>
    </>)
}