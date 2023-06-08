import React, {useEffect,useState} from "react";

const ProgressBar = props =>{

    const [offSet, setOffSet] = useState(0);
    const {
        size,
        goal,
        progress,
        strokeWidth,
        circleOneStroke,
        circleTwoStroke,

    } = props;

    const center = size/2;
    const radius = size/2 - strokeWidth/2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const progressOffSet = ((goal-progress)/goal) * circumference;
        setOffSet(progressOffSet);
        
    }, [setOffSet,progress, circumference, offSet   ]);

    return(
        <>
        <div className="progress-bar-container">
            <div className="principal">
                <svg
                    className="circular-chart"
                    width={size}
                    height={size}
                    fill="#fff"
                >
                    <circle
                        className="circular-bg"
                        stroke={circleOneStroke}
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                    ></circle>
                    <circle
                        className="circle"
                        stroke={circleTwoStroke}
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offSet}
                    ></circle>
                    
                    <text
                        x={center}
                        y={center}
                        className="percentage"
                    >
                        {progress} cal /
                    </text>

                    <text
                        x={center}
                        y={center+35}
                        className="percentage-total"
                    >
                        {goal} cal
                    </text>
                    
                </svg>
            </div>
        </div> 
        </>
        
    )

}

export default ProgressBar;