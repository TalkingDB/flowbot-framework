const GRAPH_KEY = 'graphIds';
const JOB_KEY = 'jobIds';

// adding a new graphid to the session storage
export const addGraphId = (graphId: string) => {
    const graphIds = getGraphIds();   

    // making sure it is not already there;
    if (!graphIds.includes(graphId)) {
        graphIds.push(graphId);
        sessionStorage.setItem(GRAPH_KEY, JSON.stringify(graphIds));
    }
};
// fetching all stored graphids from the session storage
export const getGraphIds = (): string[] => {
    if (typeof window === 'undefined') return [];
  
    const value = sessionStorage.getItem(GRAPH_KEY);
    return value ? JSON.parse(value) : [];
};
// clearing the sessionstorage of graphids
export const clearGraphIds = () => {
    if (typeof window === 'undefined') return;

    sessionStorage.removeItem(GRAPH_KEY);
};


// adding a new jobid to the session storage
export const addJobId = (jobId: string) => {
    const jobIds = getJobIds();
    if (!jobIds.includes(jobId)) {
        jobIds.push(jobId);
        sessionStorage.setItem(JOB_KEY, JSON.stringify(jobIds));
    }
};
// fetching all stored jobids from the session storage
export const getJobIds = (): string[] => {
    if (typeof window === 'undefined') return [];

    const value = sessionStorage.getItem(JOB_KEY);
    return value ? JSON.parse(value) : [];
};
// clearing the sessionstorage of jobids
export const clearJobIds = () => {
    if (typeof window === 'undefined') return;

    sessionStorage.removeItem(JOB_KEY);
};
