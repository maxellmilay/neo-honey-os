import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Cross2Icon,
    PlayIcon,
    PauseIcon,
    StopIcon,
    TrackNextIcon,
    PlusIcon,
    ReloadIcon,
    ChevronRightIcon,
 } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select"
import { Card, CardHeader, CardContent, CardBody, CardFooter } from "../../components/ui/card";
import JobPoolTable from '../../components/jobPoolTable';
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { FirstComeFirstServe, 
ShortestJobFirst, 
Priority, 
PreemptivePriority, 
STRF, 
RoundRobin 
} from '../../../classes/algorithm';
import { Job } from '../../../classes/job';
import { Simulation } from '../../../classes/simulation';
// import './styles.css'
import './styles.scss'


function PCB() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('CPU-Scheduling-Simulator');
    const [simulation, setSimulation] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [simSpeed, setSimSpeed] = useState(500);
    const [quantum, setQuantum] = useState(4);
    const [jobCount, setJobCount] = useState(3);
    const [algo, setAlgo] = useState('fcfs');
    const [running, setRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        newSim();
    }, [algo, jobCount, quantum]);

    useEffect(() => {
        if (running) {
            setTimer(simSpeed);
        } else {
            setTimer(0);
        }
        return () => clearInterval(intervalRef.current); // Cleanup on unmount
    }, [running, simSpeed, simulation]);

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

    const getAlgorithm = () => {
        switch (algo) {
        case 'fcfs':
            return new FirstComeFirstServe();
        case 'sjf':
            return new ShortestJobFirst();
        case 'rr':
            return new RoundRobin();
        case 'p':
            return new Priority();
        case 'pp':
            return new PreemptivePriority();
        case 'strf':
            return new STRF();
        default:
            return new FirstComeFirstServe();
        }
    };

    const newSim = (sameJobs = false) => {
        stop();
        if (!sameJobs) {
            const newJobs = [];
            for (let i = 0; i < Number(jobCount); i++) {
                newJobs.push(Job.createRandomJob(i + 1));
            }
            setJobs(newJobs);
        }
        const algorithm = getAlgorithm();
        algorithm.quantumTime = Number(quantum);
        const sim = new Simulation(algorithm, jobs);
        sim.reset();
        setSimulation(sim);
    };

    const play = () => {
        if (simulation.isFinished()) {
        simulation.reset();
        }
        setRunning(true);
    };

    const stop = () => {
        setRunning(false);
    };

    const next = () => {
        stop();
        simulation.nextStep();
    };

    const finish = () => {
        setTimer(1);
    };

    const reset = () => {
        stop();
        simulation.reset();
    }; 
    
    const handleAlgoChange = (e) => {
        setAlgo(e.target.value);
        newSim(jobs.length === jobCount);
    };

    return (
        <>
        <div className="h-screen">
        <div className="grid grid-cols-3 items-center w-screen py-2">
            <h2 className="col-start-2 col-end-3 text-center">BusyBee</h2> 
            <div className="col-start-3 col-end-4 text-right">
                <Button variant="icon" onClick={()=>navigate('/desktop')}><Cross2Icon /></Button>
            </div>
        </div>
        <div className="grid grid-cols-3 grid-rows-4 relative flex bg-orange-50 h-[790px] w-full p-5 justify-center items-center rounded-lg gap-4 box-shadow-lg">     
            <div className="col-span-2">
            <Card className="bg-slate-100 h-full">
                <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t"><h4>Data</h4></CardHeader>
                <CardContent className="justify-center justify-items-center items-center h-[100px] py-2 grid grid-cols-5">
                    <div>
                        <p>No. of Jobs</p>
                        <p><b className="text-2xl">{jobs.length}</b></p>
                    </div>
                    <div className="justify-center items-center">
                        <p>Algorithm</p>
                        <Select className="form-control"
                                value={algo}
                                disabled={running}
                                onChange={handleAlgoChange}>
                            <SelectTrigger  className="h-[30px] w-full">
                                <SelectValue placeholder="Select a policy" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value = "fcfs">First Come, First Served</SelectItem>
                                    <SelectItem value = "strf">Shortest Job First</SelectItem>
                                    <SelectItem value = "p">Priority</SelectItem>
                                    <SelectItem value = "rr">Round Robin</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <p>Quantum</p>
                        <p><b className="text-2xl">{quantum}</b></p>
                    </div>
                    <div className="col-span-2">
                        <div className = "flex gap-3 py-1">
                            <Button variant = "nohover" 
                                    className = "h-1/4 flex gap-2 bg-green-500 active:bg-green-600" 
                                    onClick={play}><PlayIcon />Start</Button>
                            <Button variant = "nohover" 
                                    className = "h-1/4 flex gap-2 bg-red-500 active:bg-red-600" 
                                    onClick={finish}><StopIcon /> Stop</Button>
                            <Button variant = "nohover" 
                                    className = "h-1/4 flex gap-2 bg-orange-500 active:bg-orange-600" 
                                    onClick={stop}><PauseIcon />Pause</Button>
                            <Button variant = "nohover" 
                                    className = "h-1/4 flex gap-2 bg-gray-500 active:bg-gray-600" 
                                    onClick={next}><TrackNextIcon />Next</Button>
                        </div>
                        <div className = "flex gap-6">
                            <Button variant = "nohover" 
                                    className = "h-1/4 flex gap-2 bg-yellow-400 active:bg-yellow-600" 
                                    onClick={() => newSim()}><PlusIcon /> Create New Task</Button>
                            <Button variant = "nohover" 
                                    className = "h-1/4 flex gap-2 bg-gray-400 active:bg-gra-600" 
                                    onClick={reset}><ReloadIcon />Start New Simulation</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            </div>
            <div>
            <Card className="bg-slate-100 h-full">
                <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t"><h4>CPU</h4></CardHeader>
                <CardContent className="justify-center items-center h-[100px] py-2 grid grid-cols-4">
                    <div>
                        <p>Current Job</p>
                        <p><b className="text-2xl">{simulation?.jobText}</b></p>
                    </div>
                    <div>
                        <p>Current Time</p>
                        <p><b className="text-2xl">{simulation?.time}</b></p>
                    </div>
                    <div>
                        <p>Idle Time</p>
                        <p><b className="text-2xl">{simulation?.idleTime}</b></p>
                    </div>
                    <div>
                        <p>Utilization</p>
                        <p><b className="text-2xl">{simulation?.utilization}%</b></p>
                    </div>
                </CardContent>
            </Card>
            </div>
            <div className="h-full row-span-2 col-span-2">
                <Card className="bg-slate-100 h-full">
                    <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t"><h4>Job Pool (PCB)</h4></CardHeader>
                    <CardContent className="m-0">
                        <JobPoolTable 
                            // jobs={jobs}
                            simulation={simulation} 
                        /></CardContent>
                </Card>
            </div>
            <div className="h-full row-span-1 col-span-1">
                <Card className="bg-slate-100 h-full">
                    <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t"><h4>Ready Queue</h4></CardHeader>
                    <CardContent className="flex flex- start items-center justify-center h-[100px] px-4 pt-4">
                        <div className="flex items-center">
                            <ChevronRightIcon className="h-[20px] w-[20px]"/>
                        </div>
                        <ScrollArea className="overflow-x-auto whitespace-nowrap w-full max-w-7xl mx-auto">
                                <div className="flex flex-grow justify-start items-start">
                                    {simulation?.readyQueue.map((item, index) => (
                                        <div key={index} className={`gantt-lg-${item.id}`}>{item.id}</div>
                                    ))}
                                </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
            <div className="col-span-3 h-full">
                <Card className="bg-slate-100 h-full">
                    <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t">
                        <h4>Gantt Chart</h4>
                    </CardHeader>
                      <CardContent className="flex flex- start items-center justify-center h-[100px] px-4 pt-4">
                        <div className="flex items-center">
                            <ChevronRightIcon className="h-[20px] w-[20px]"/>
                        </div>
                        <ScrollArea className="overflow-x-auto whitespace-nowrap w-full max-w-9xl mx-auto">
                                <div className="flex flex-grow justify-start items-start">
                                    
                                {simulation?.ganttChart.map((item, index) => (
                                    <div key={index} className={`gantt-lg-${item}`}>
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