import type { DurationUpdate, UserRequest } from './types';
import customFetch from './fetch';

import type { QueueStatus, QueueJoinResponse, QueueMetrics, TimerInfo, ConnectionResponse, ApiResponse, GetUsersResponse } from './types';

/**
 * Helps interface with the quieue API developed in Fanline
 */

// Base API URL
const API_URL = import.meta.env.VITE_API_URL || 'https://lucie.chat';

// Fonction utilitaire pour gérer les erreurs de fetch
const handleFetchError = (error: unknown) => {
    console.error('Erreur détaillée:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Le serveur n\'est pas disponible');
    }
    throw error;
};

// Join Queue
export const joinQueue = async (userRequest: UserRequest): Promise<{ position: number }> => {
    try {
        console.log('Tentative de joinQueue avec:', userRequest);
        const response = await customFetch(`${API_URL}/queue/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userRequest),
        });

        console.log('Réponse joinQueue:', response.status);
        if (!response.ok) {
            const error = await response.json();
            console.error('Erreur joinQueue:', error);
            throw new Error(error.detail);
        }

        const data = await response.json();
        console.log('Données joinQueue:', data);
        return data;
    } catch (error) {
        console.error('Exception joinQueue:', error);
        handleFetchError(error);
        throw error;
    }
};

// Leave Queue
export const leaveQueue = async (userRequest: UserRequest): Promise<{ success: boolean }> => {
    const response = await customFetch(`${API_URL}/queue/leave`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userRequest),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail);
    }

    return await response.json();
};

// Confirm Connection
export const confirmConnection = async (userRequest: UserRequest): Promise<{ session_duration: number, total_duration: number }> => {
    try {
        const response = await customFetch(`${API_URL}/queue/confirm/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userRequest),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail);
        }

        const data = await response.json();
        return {
            session_duration: data.session_duration,
            total_duration: data.total_duration || data.session_duration
        };
    } catch (error) {
        handleFetchError(error);
        throw error;
    }
};

// Récupérer le statut
export const getStatus = async (userRequest: UserRequest): Promise<QueueStatus> => {
    try {
        const response = await customFetch(`${API_URL}/queue/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userRequest),
        });
        if (!response.ok) {
            const error = await response.json();
            console.error('Erreur getStatus:', error);
            throw new Error(error.detail);
        }

        const data = await response.json();
        // console.log('Données getStatus:', data);
        return {
            user_id: data.user_id,
            status: data.status,
            position: data.position,
            remaining_time: data.remaining_time || 0,
            estimated_wait_time: data.estimated_wait_time || 0,
            timestamp: data.timestamp
        };
    } catch (error) {
        handleFetchError(error);
        throw error;
    }
};

// Heartbeat
export const heartbeat = async (userRequest: UserRequest): Promise<{ success: boolean }> => {
    const response = await customFetch(`${API_URL}/queue/heartbeat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userRequest),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail);
    }

    return await response.json();
};

// Get Metrics
export const getMetrics = async (): Promise<QueueMetrics> => {
    try {
        const response = await customFetch(`${API_URL}/queue/metrics`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail);
        }

        const data = await response.json();
        return {
            active_users: data.active_users,
            waiting_users: data.waiting_users,
            draft_users: data.draft_users,
            total_slots: data.total_slots,
            total_accounts: data.total_accounts,
        };
    } catch (error) {
        handleFetchError(error);
        throw error;
    }
};

// Get Timers
export const getTimers = async (userRequest: UserRequest): Promise<TimerInfo> => {
    try {
        const response = await customFetch(`${API_URL}/queue/timers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userRequest),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail);
        }

        const data = await response.json();
        return {
            timer_type: data.timer_type,
            ttl: data.ttl,
            total_duration: data.total_duration || data.ttl,
            channel: data.channel
        };
    } catch (error) {
        handleFetchError(error);
        throw error;
    }
};



export const getUsers = async (): Promise<GetUsersResponse> => {
    try {
        const response = await customFetch(`${API_URL}/queue/get_users`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail);
        }

        const data = await response.json();
        return {
            waiting_users: data.waiting_users,
            draft_users: data.draft_users,
            active_users: data.active_users
        };
    } catch (error) {
        handleFetchError(error);
        throw error;
    }
};


export const updateSessionDuration = async (durationUpdate: DurationUpdate): Promise<GetUsersResponse> => {
    try {
        const response = await customFetch(`${API_URL}/queue/update_session_duration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(durationUpdate),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail);
        }

        const data = await response.json();
        return response.json();

    } catch (error) {
        handleFetchError(error);
        throw error;
    }
};

export const updateMaxUsers = async (maxUsers: number): Promise<{ success: boolean }> => {
    try {
        const response = await customFetch(`${API_URL}/queue/update_max_users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "max_users": maxUsers }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail);
        }

        return await response.json();
    } catch (error) {
        handleFetchError(error);
        throw error;
    }
};

export const updateDraftDuration = async (durationUpdate: DurationUpdate): Promise<{ success: boolean }> => {
    try {
        const response = await customFetch(`${API_URL}/queue/update_draft_duration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(durationUpdate),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail);
        }

        return await response.json();
    } catch (error) {
        handleFetchError(error);
        throw error;
    }
};