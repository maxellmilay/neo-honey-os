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
import { FirstComeFirstServe, 
ShortestJobFirst, 
Priority, 
PreemptivePriority, 
STRF, 
RoundRobin 
} from '../../../classes/algorithm';
import { Job } from '../../../classes/job';
import { Simulation } from '../../../classes/simulation';


function PCB() {

    const navigate = useNavigate();
    const [title, setTitle] = useState('CPU-Scheduling-Simulator');
    const [simulation, setSimulation] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [simSpeed, setSimSpeed] = useState(1000);
    const [quantum, setQuantum] = useState(2);
    const [jobCount, setJobCount] = useState(8);
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
        // setTimer(simSpeed);
    };

    const stop = () => {
        setRunning(false);
        // setTimer(0);
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
                        <p><b className="text-2xl">6999</b></p>
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
                        <p><b className="text-2xl">6999</b></p>
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
                    <CardContent className="m-0"><JobPoolTable simulation={simulation} /></CardContent>
                </Card>
            </div>
            <div className="h-full row-span-1 col-span-1">
                <Card className="bg-slate-100 h-full">
                    <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t"><h4>Average</h4></CardHeader>
                    <CardContent className="justify-center items-center h-[100px] py-2 grid grid-cols-2">
                        <div>
                            <p>Waiting</p>
                            <p><b className="text-2xl">{simulation?.averageWait}</b></p>
                        </div>
                        <div>
                            <p>Turnaround Time</p>
                            <p><b className="text-2xl">{simulation?.averageTurnaround}</b></p>
                        </div>
                        </CardContent>
                </Card>
            </div>
            <div className="h-full row-span-1 col-span-1">
                <Card className="bg-slate-100 h-full">
                    <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t"><h4>Ready Queue</h4></CardHeader>
                    <CardContent className="items-center justify-center h-[100px] py-2 grid grid-cols-6">
                        <div className="col-span-1"><ChevronRightIcon className="h-[20px] w-[20px]"/></div>
                        <div className="grid col-span-5 justify-items-start">
                            {/* insert */}
                      {simulation?.readyQueue.map((item, index) => (
                        <div key={index} className={`gantt-lg-${item.id}`}>{item.id}</div>
                      ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="col-span-3 h-full">
                <Card className="bg-slate-100 h-full">
                    <CardHeader className="bg-slate-300 h-[20px] justify-center items-center rounded-t"><h4>Gantt Chart</h4></CardHeader>
                    <CardContent className="items-center justify-center h-[100px] py-2 grid grid-cols-10">
                        <div className="col-span-1"><ChevronRightIcon className="h-[20px] w-[20px]"/></div>
                        <div className="grid col-span-9 justify-items-start">
                            {/* insert */}
                            
                  {simulation?.ganttChart.map((item, index) => (
                    <div key={index} className={`gantt-sm-${item}`}>{item}</div>
                  ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
        </div>
        </>
    );
}

export default PCB;