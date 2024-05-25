import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Cross2Icon, PauseIcon, StopIcon, TrackNextIcon, CheckIcon, ReloadIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../components/ui/toggle-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Card, CardHeader, CardContent, CardBody, CardFooter } from "../../components/ui/card";
import JobPoolTable from '../../components/jobPoolTable';
import ReadyQTable from '../../components/readyQTable';
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { FirstComeFirstServe, ShortestJobFirst, Priority, PreemptivePriority, STRF, RoundRobin } from '../../../classes/algorithm';
import { Job } from '../../../classes/job';
import { Simulation } from '../../../classes/simulation';
import {ReactComponent as PlayIcon} from '../../assets/img/play-fill.svg'
// import './styles.css'
import './styles.scss'

// PCB component simulates a CPU scheduling simulation using various algorithms
function PCB() {
    const navigate = useNavigate();  // Hook to navigate programmatically
    const [title, setTitle] = useState('CPU-Scheduling-Simulator');  // State for the title
    const [simulation, setSimulation] = useState(null);  // State for the simulation object
    const [jobs, setJobs] = useState([]);  // State for the list of jobs
    const [simSpeed, setSimSpeed] = useState(500);  // State for the simulation speed
    const [quantum, setQuantum] = useState(4);  // State for the quantum time (used in Round Robin)
    const [jobCount, setJobCount] = useState(0);  // State for the number of jobs
    const [algo, setAlgo] = useState('fcfs');  // State for the selected algorithm
    const [running, setRunning] = useState(false);  // State to determine if the simulation is running
    const intervalRef = useRef(null);  // Ref for the simulation interval

    // useEffect to create a new simulation whenever the algorithm changes
    // useEffect(() => {
    //     newSim();
    // }, [algo]);

    // useEffect to manage the simulation timer when the running state or simSpeed changes
    useEffect(() => {
        if (running) {
            setTimer(simSpeed);
        } else {
            setTimer(0);
        }
        return () => clearInterval(intervalRef.current); // Cleanup on unmount
    }, [running, simSpeed, simulation]);

    // Function to set the timer interval for the simulation steps
    const setTimer = (time) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (time === 0) return;
        intervalRef.current = setInterval(() => {
        if (simulation.isFinished()) {
             clearInterval(intervalRef.current);
            setRunning(false);
        }
        simulation.nextStep();
        setJobs([...simulation.jobs]);
        }, time);
    };

    // Function to get the selected scheduling algorithm
    const getAlgorithm = (selectedAlgo) => {
        let algorithm;
        switch (selectedAlgo) {
            case 'fcfs':
                algorithm = new FirstComeFirstServe();
                break;
            case 'sjf':
                algorithm = new STRF();
                break;
            case 'p':
                algorithm = new Priority();
                break;
            case 'rr':
                algorithm = new RoundRobin();
                algorithm.quantumTime = Number(quantum); // Ensure quantum time is set
                break;
            default:
                algorithm = new FirstComeFirstServe();
        }
        return algorithm;
    };

    // Function to create a new simulation
    const newSim = (selectedAlgo) => {
        console.log("newSim")
        const newJobs = [];
        for (let i = 0; i < Number(1); i++) {
            newJobs.push(Job.createRandomJob(i + 1));
        }
        setJobs(newJobs);
        const algorithm = getAlgorithm(selectedAlgo); // Pass the selected algorithm
        algorithm.quantumTime = Number(quantum);
        const sim = new Simulation(algorithm, newJobs);
        sim.reset();
        setSimulation(sim);
    };
    // Function to start the simulation
    const play = (selectedAlgo) => {
        if (!running) {
            newSim(selectedAlgo);
            setRunning(true);
            console.log(algo)
        }
    };

    // Function to stop the simulation
    const stop = () => {
        setRunning(false);
        console.log("stop")
    };

    // Function to reset the simulation
    const reset = () => {
        stop();
        simulation.reset();
        setSimulation(null);
        setJobCount(0);
        setRunning(false);
        setJobs([]);
    }; 
    

    const scrollAreaRef = useRef(null);
    // useEffect to handle scrolling of the Gantt chart area
    useEffect(() => {
        if (scrollAreaRef.current) {
            // Calculate the total width of all content within the scroll area
            const totalContentWidth = scrollAreaRef.current.scrollWidth;

            // Set the scrollLeft property to the total width of all content
            scrollAreaRef.current.scrollLeft = totalContentWidth;
        }
    }, [simulation?.ganttChart]); // Assuming simulation?.ganttChart determines when the content updates

    // Function to handle the change of the selected algorithm
    const handleAlgoChange = (event) => {
        const newValue = event.target.value;
        setAlgo(newValue);
    }
    

    // JSX for the PCB component UI
    return (
        <>
        <div className="h-screen">
        <div className="grid grid-cols-3 items-center w-screen py-2">
            <h2 className="col-start-2 col-end-3 text-center">BusyBee</h2> 
            <div className="col-start-3 col-end-4 text-right">
                <Button variant="icon" onClick={()=>navigate('/desktop')}><Cross2Icon /></Button>
            </div>
        </div>
        <div className="grid grid-cols-3 grid-rows-8 relative flex bg-orange-50 h-[790px] w-full p-5 justify-center items-center rounded-lg gap-4 box-shadow-lg">     
            {/* Scheduling Policy Card */}
            <div className="row-span-3 h-full" >
            <Card className="bg-slate-100 h-full">
                <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t"><h4>Scheduling Policy</h4></CardHeader>
                <CardContent className="justify-center justify-items-center items-center h-42 pt-6 px-6 grid grid-rows-2">
                    <div className="justify-between items-center row-start-1 flex">
                        <div>
                        {/* <p>Choose Algorithm</p> */}
                        <ToggleGroup type="single" className="grid grid-cols-2 grid-rows-2 gap-4"
                            onChange={handleAlgoChange}
                            aria-label="Demo Text Alignment">
                            <ToggleGroupItem className="row-start-1 col-start-1 data-[state=on]:bg-yellow-300 hover:bg-yellow-100" value="fcfs" aria-label="Toggle fcfs"
                                disabled={running}
                                onClick={handleAlgoChange} >
                                <Button variant="link" value="fcfs">
                                    First Come, First Served
                                </Button>
                            </ToggleGroupItem>
                            <ToggleGroupItem className="row-start-2 col-start-1 data-[state=on]:bg-yellow-300 hover:bg-yellow-100" value="sjf" aria-label="Toggle sjf"  
                                disabled={running}
                                onClick={handleAlgoChange}>
                                <Button variant="link" value="sjf">
                                Shortest Job First
                                </Button>
                            </ToggleGroupItem>
                            <ToggleGroupItem className="row-start-1 col-start-2 data-[state=on]:bg-yellow-300 hover:bg-yellow-100" value="p" aria-label="Toggle p"  
                                disabled={running}
                                onClick={handleAlgoChange}>
                                <Button variant="link" value="p">
                                Priority Scheduling
                                </Button>
                            </ToggleGroupItem>
                            <ToggleGroupItem className="row-start-2 col-start-2 data-[state=on]:bg-yellow-300" value="rr" aria-label="Toggle rr"
                                disabled={running}
                                onClick={handleAlgoChange}>
                                <Button variant="link" value="rr">
                                    Round Robin
                                </Button>
                            </ToggleGroupItem>
                        </ToggleGroup>
                            </div>
                    </div>
                    <div className="row-start-2 ">
                        <div className = "flex gap-3">
                            <Button variant = "nohover" 
                                    className = "h-1/4 flex gap-2 bg-green-500 bg-green-600" 
                                    onClick={() => play(algo)}
                                    disabled={running}>
                                    <PlayIcon/>
                                        Start Simulation
                            </Button>
                            <Button variant = "nohover" 
                                    className = "h-1/4 flex gap-2 bg-gray-400 bg-red-600" 
                                    onClick={reset}
                                    disabled={!running}>
                                    <ReloadIcon/>
                                        Clear Simulation
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            </div>

            {/* CPU Card */}
            <div className="row-span-3 col-start-1 row-start-4 h-full">
                <Card className="bg-slate-100 h-full">
                    <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t"><h4>CPU</h4></CardHeader>
                    <CardContent className="justify-center items-center align-middle h-[150px] pt-8 grid grid-cols-3 gap-4">
                        <div className="grid grid-rows-2 gap-8">
                            <div>
                                <p>No. of Jobs</p>
                                <p><b className="text-2xl">{jobs.length}</b></p>
                            </div>
                            <div>
                                <p>Current Job</p>
                                <p><b className="text-2xl">{simulation ? simulation.jobText : 'Idle'}</b></p>
                            </div>
                        </div>
                        <div className="grid grid-rows-2 gap-8">
                            <div>
                                <p>Idle Time</p>
                                <p><b className="text-2xl">{simulation ? simulation.idleTime : 0}</b></p>
                            </div>
                            <div>
                                <p>Current Time</p>
                                <p><b className="text-2xl">{simulation ? simulation.time : 0 }</b></p>
                            </div>
                        </div>
                            {algo !== "rr" ? (
                                <div>
                                    <p>Utilization</p>
                                    <p><b className="text-2xl">{simulation ? simulation.utilization : 0}%
                                    </b></p>
                                </div>
                            ) : (
                             <div className="grid grid-rows-2 gap-8">
                                <div>
                                    <p>Utilization</p>
                                    <p><b className="text-2xl">{simulation ? simulation.utilization : 0}%
                                    </b></p>
                                </div>
                                <div>
                                    <p>Quantum</p>
                                    <p><b className="text-2xl">{quantum}</b></p>
                                </div>
                            </div>
                            )}
                    </CardContent>
                </Card>
            </div>

            {/* Job Pool Card */}
            <div className="row-span-6 col-start-2 row-start-1 h-full">
                <Card className="bg-slate-100 h-full">
                    <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t"><h4>Job Pool (PCB)</h4></CardHeader>
                    <CardContent className="m-0">
                        <JobPoolTable simulation={simulation}  jobs={[]} />
                    </CardContent>
                </Card>
            </div>

            {/* Ready Queue Card */}
            <div className="row-span-6 col-start-3 row-start-1 h-full">
                <Card className="bg-slate-100 h-full">
                    <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t">
                        <h4>Ready Queue</h4>
                    </CardHeader>
                    <CardContent className="grid grid-rows-5 grid-cols-1 h-full px-4">
                        <div className="row-span-4 overflow-hidden border-b border-gray-300" style={{ maxHeight: '90%' }}>
                            <div className="h-full">
                                <ReadyQTable simulation={simulation} />
                            </div>
                        </div>
                        <div className="row-span-1 flex justify-start items-center space-x-2" style={{ maxHeight: '10%' }}>
                            <ChevronRightIcon className="h-[20px] w-[20px]" />
                            <ScrollArea className="overflow-x-auto whitespace-nowrap w-full max-w-7xl mx-auto">
                                <div className="flex flex-grow justify-start items-start space-x-1">
                                    {simulation?.readyQueue.map((item, index) => (
                                        <div key={index} className={`rounded-md gantt-lg-${item.id}`}>{item.id}</div>
                                    ))}
                                </div>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Gantt Chart Card */}
            <div className="col-span-3 row-span-2 row-start-7 h-full">
                <Card className="bg-slate-100 h-full">
                    <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t">
                        <h4>Gantt Chart</h4>
                    </CardHeader>
                      <CardContent className="flex flex- start items-center justify-center h-[100px] px-4 pt-8">
                        <div className="flex items-center mb-3">
                            <ChevronRightIcon className="h-[20px] w-[20px]" />
                        </div>
                        <ScrollArea className="overflow-x-auto whitespace-nowrap w-full h-full max-w-9xl mx-auto"
                        ref={scrollAreaRef}>
                                <div className="flex flex-grow justify-start items-start space-x-1">
                                {simulation?.ganttChart.map((item, index) => (
                                    <div key={index} className={`rounded-md gantt-lg-${item}`}>
                                        {item}
                                    </div>
                                ))}
                                </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
        </div>
        </>
    );
}

export default PCB;