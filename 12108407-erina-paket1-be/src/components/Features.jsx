import Banner5 from '../images/banner5rm.png';
import { motion } from 'framer-motion';
import { fadeIn } from '../components/data/variants';

const Features = () => {
    return (
        <div className="my-40 md:px-14 px-4 max-w-screen-2xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
                <motion.div variants={fadeIn("right", 0.2)} initial="hidden" whileInView={"show"} viewport={{ once: false, amount: 0.7 }} className="lg:w-1/4">
                    <h3 className="text-3xl text-primary font-bold mb-3">Why we are better than others</h3>
                    <p className="text-base text-tartiary">A simple paragraph is comprised of three major components. The first sentence, which is often a declarative sentence, is called the “topic sentence.”</p>
                </motion.div>


                <motion.div variants={fadeIn("up", 0.3)} initial="hidden" whileInView={"show"} viewport={{ once: false, amount: 0.7 }}
                    className='w-full lg:w-3/4'>
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8'>
                        <div className='bg-[rgba(255, 255, 255, 0.04)] rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer '>
                            <div>
                                <img classNa cursor-pointerme='w-48' src={Banner5} alt="" />
                                <h5 className='text-2xl font-semibold text-primary px-5 text-center mt-5'>Convenient Study Schedule</h5>
                            </div>
                        </div>
                        <div className='bg-[rgba(255, 255, 255, 0.04)] rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer md:mt-16 '>
                            <div>
                                <img className='w-48' src={Banner5} alt="" />
                                <h5 className='text-2xl font-semibold text-primary px-5 text-center mt-5'>Convenient Study Schedule</h5>
                            </div>
                        </div>
                        <div className='bg-[rgba(255, 255, 255, 0.04)] rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer '>
                            <div>
                                <img className='w-48' src={Banner5} alt="" />
                                <h5 className='text-2xl font-semibold text-primary px-5 text-center mt-5'>Convenient Study Schedule</h5>
                            </div>
                        </div>

                    </div>
            </motion.div>
        </div>
        </div >
    )
}

export default Features;