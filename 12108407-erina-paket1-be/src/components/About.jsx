import Banner1 from '../images/bannerAbout.png'
import { motion } from 'framer-motion';
import { fadeIn } from '../components/data/variants';

const About = () => {
    return (
        <motion.div variants={fadeIn("right", 0.3)} initial="hidden" whileInView={"show"} viewport={{ once: false, amount: 0.7 }}
        className="md:px-14 p-4 py-16 max-w-s mx-auto" id='About'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4 px-4'>
                <div className='md:w-1/2'>
                    <img src={Banner1} alt="" />
                </div>

                <div className='md:w-2/5 '>
                    <h2 className='md:text-5xl text-3xl font-bold text-primary mb-5 leading-normal'>We have been improving our product <span className='text-secondary'>for many years.</span></h2>
                    <p className='text-tartiary text-lg mb-7'>A good example of a paragraph contains a topic conclusion.
                    'There are many different kinds of animals that live in China.</p>
                    <button className='btnPrimary'>Get Started</button>
                </div>
            </div>
        </motion.div>
    )
}

export default About;