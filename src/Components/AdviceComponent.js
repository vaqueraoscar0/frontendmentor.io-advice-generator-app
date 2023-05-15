import '../App.css';
import dividerImg from '../images/pattern-divider-desktop.svg'
import dividerImg2 from '../images/pattern-divider-mobile.svg'
import iconDiceImg from '../images/icon-dice.svg'
import {useEffect, useState} from "react";

function AdviceComponent() {
    const [randomAdvice, setRandomAdvice] = useState("It is easy to sit up and take notice, what's difficult is getting up and taking action.");
    const [randomAdviceId, setRandomAdviceId] = useState(117);
    const [isMobile, setIsMobile] = useState(false)

    const handleResize = () => {
        if (window.innerWidth < 375 || window.innerHeight < 667) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    },[])

    const fetchNewAdvice = () =>{
        fetch("https://api.adviceslip.com/advice")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setRandomAdviceId(result.slip.id)
                    setRandomAdvice(result.slip.advice)
                }, (error) => { console.log(error) }
            )
    }

    return (
        <div className="advice">
            <div className={'advice-box'}>
                <h5>advice #{randomAdviceId}</h5>
                <p>"{randomAdvice}"</p>
            </div>

            <div className={'advice-box-group2'}>
                <img src={isMobile? dividerImg2: dividerImg} alt={'divider'}/>
            </div>

            <div className={'advice-box-button'}>
                <div className={'advice-box-button-icon'}>
                    <button onClick={fetchNewAdvice} className={'advice-box-button-rec'}>
                        <img src={iconDiceImg} alt={'Dice'}/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdviceComponent;
