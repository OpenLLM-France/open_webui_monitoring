import type { DurationUpdate, UserRequest } from './types';
import customFetch from './fetch';
import type { QueueStatus, QueueJoinResponse, QueueMetrics, TimerInfo, ConnectionResponse, ApiResponse, GetUsersResponse } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const handleFetchError = (error: unknown) => {
    console.error('Erreur détaillée:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Le serveur n\'est pas disponible');
    }
    throw error;
};

const apiCall = async <T>(endpoint: string, method: string = 'GET', body?: any): Promise<T> => {
    try {
        const response = await customFetch(`${API_URL}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : undefined,
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

export const joinQueue              = (userRequest: UserRequest): Promise<{ position: number }>                                     => apiCall('/queue/join', 'POST', userRequest);
export const leaveQueue             = (userRequest: UserRequest): Promise<{ success: boolean }>                                     => apiCall('/queue/leave', 'POST', userRequest);
export const confirmConnection      = (userRequest: UserRequest): Promise<{ session_duration: number, total_duration: number }>     => apiCall('/queue/confirm/', 'POST', userRequest);
export const getStatus              = (userRequest: UserRequest): Promise<QueueStatus>                                              => apiCall('/queue/status', 'POST', userRequest);
export const heartbeat              = (userRequest: UserRequest): Promise<{ success: boolean }>                                     => apiCall('/queue/heartbeat', 'POST', userRequest);
export const getMetrics             = (): Promise<QueueMetrics>                                                                     => apiCall('/queue/metrics');
export const getTimers              = (userRequest: UserRequest): Promise<TimerInfo>                                                => apiCall('/queue/timers', 'POST', userRequest);
export const getUsers               = (): Promise<GetUsersResponse>                                                                 => apiCall('/queue/get_users');
export const updateSessionDuration  = (durationUpdate: DurationUpdate): Promise<GetUsersResponse>                                   => apiCall('/queue/update_session_duration', 'POST', durationUpdate);
export const updateMaxUsers         = (maxUsers: number): Promise<{ success: boolean }>                                             => apiCall('/queue/update_max_users', 'POST', { max_users: maxUsers });
export const updateDraftDuration    = (durationUpdate: DurationUpdate): Promise<{ success: boolean }>                               => apiCall('/queue/update_draft_duration', 'POST', durationUpdate);
