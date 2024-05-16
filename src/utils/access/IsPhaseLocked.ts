// Constants for different phases
export const PHASES = ['STARTUP', 'PLANNING', 'EXECUTING', 'CONTROLLING', 'CLOSING'];

/**
 * Checks if the provided phase is locked based on the current phase.
 * @param current_phase - The current phase.
 * @param thisPhaseIndex - The index of the phase to be checked.
 * @returns true if the phase is locked, false otherwise.
 */
export const IsPhaseLocked = ({
  current_phase,
  thisPhaseIndex,
  projectID 
}: {
  projectID : string ,
  current_phase: string;
  thisPhaseIndex: number;
}) => {
  let currentPhaseIndex = 0;

  if(projectID === ""){
    return false
  }

  // Find the index of the current phase
  for (let i = 0; i < PHASES.length; i++) {
    if (current_phase === PHASES[i]) {
      currentPhaseIndex = i;
      break;
    }
  }

  if (thisPhaseIndex <= currentPhaseIndex) {
    return true;
  }
  return false;
};

/**
 * Get the index number of the current phase.
 * @param current_phase - The current phase.
 * @returns The index number of the current phase.
 */
export const getCurrentPhaseNumber = (current_phase: string) => {
  let currentPhaseIndex = 0;

  // Find the index of the current phase
  for (let i = 0; i < PHASES.length; i++) {
    if (current_phase === PHASES[i]) {
      currentPhaseIndex = i;
      break;
    }
  }
  return currentPhaseIndex;
};

/**
 * Checks if switching to the provided phase is allowed based on the current phase.
 * @param current_phase - The current phase.
 * @param thisPhaseIndex - The index of the phase to switch to.
 * @returns true if switching is allowed, false otherwise.
 */
export const CanSwitch = ({
  current_phase,
  thisPhaseIndex,
}: {
  current_phase: string;
  thisPhaseIndex: number;
}) => {
  const currentPhaseIndex = getCurrentPhaseNumber(current_phase);
  if (thisPhaseIndex === currentPhaseIndex) {
    return true;
  }
  return false;
};