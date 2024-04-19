import Banner2 from '../images/banner2.png';
import {motion} from 'framer-motion';
import {fadeIn} from '../components/data/variants';

const Home = () => {
  return (
    <div className="md:px-12 p-4 max-w-screen-2xl mx-auto mt-28" id='Home'>
        <div className='gradientBg shadow-md rounded-xl rounded-br-[80px] md:p-9 px-4 py-9'>
            <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-10'>
                <motion.div variants={fadeIn("down", 0.2)} initial="hidden" whileInView={"show"} viewport={{ once:false, amount: 0.7 }} >

                <div>
                    <img src={Banner2} alt="" className='lg:h-[360px]' />
                </div>
                </motion.div>

                <motion.div variants={fadeIn("down", 0.2)} initial="hidden" whileInView={"show"} viewport={{ once:false, amount: 0.7 }} className="md:w-3/5">
                    <h2 className='md:text-6xl text-4xl font-bold text-white mb-6 leading-relaxed'>Lorem ipsum dolar sit amet</h2>
                    <p className='text-[#EBEBEB] text-2xl mb-8'>A good example of a paragraph contain a topic sentence, details and a conclusion
                        there are many different kinds of animals that live in the forest. 
                    </p>
                    <div className='space-x-6 space-y-4'>
                        <button className='btnPrimary'>Get Started</button>
                        <button className='btnSecondary'>Login</button>
                    </div>
                </motion.div>

            </div>
        </div>
    </div>
  )
}

export default Home;
