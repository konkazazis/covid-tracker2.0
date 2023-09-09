import 'tailwindcss/tailwind.css';
import ChartSum from './chartSum';
import ChartAll from './chartAll';
import News from './news';
import Weather from './weather';



const Home = () => {
  return (
    <div>

      <div className='rounded-md bg-zinc-50 m-4 shadow-lg'>
        <h1 className="text-2xl font-light text-center p-2">Covid-19 Dashboard</h1>
      </div>

      <div className="grid grid-cols-3 gap-6"> 

        <div className="col-span-1">
          <ChartAll/>
          <Weather/>
        </div>

        <div className="col-span-1">
          <ChartSum />

        </div>

        <div className="col-span-1">
          {/* Add your content for the third column here */}
          <News />
        </div>

      </div>
    </div>
  );
};

export default Home;
