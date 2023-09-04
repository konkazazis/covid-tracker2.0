import 'tailwindcss/tailwind.css';
import ChartSum from './chartSum';
import ChartAll from './chartAll';


const Home = () => {
  return (
    <div>

      <div className='rounded-md bg-slate-200 m-4 shadow-lg'>
        <h1 className="text-2xl font-light text-center p-2">Covid-19 Dashboard</h1>
      </div>

      <div className="grid grid-cols-3 gap-4"> 

        <div className="col-span-1">
          <ChartAll/>
        </div>

        <div className="col-span-1">
          {/* Add your content for the second column here */}
        </div>

        <div className="col-span-1">
          {/* Add your content for the third column here */}
          <ChartSum />
        </div>

      </div>
    </div>
  );
};

export default Home;
