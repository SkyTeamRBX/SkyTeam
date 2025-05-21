// Define interfaces for each event type's arguments
export interface ServerInitErrorArgs {
    Body: string;
}

export interface UnknownArgs {
    // Add any properties for UNKNOWN event type if needed
}

// Map event types to their respective argument types
export interface EventTypes {
    "SERVER_INIT_ERROR": ServerInitErrorArgs;
    "UNKNOWN": UnknownArgs;
}

// Keys
export type EventTypeKeys = keyof EventTypes;