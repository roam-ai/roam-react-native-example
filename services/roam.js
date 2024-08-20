import Roam from 'roam-reactnative';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Configuration = {
  eventListenerStatus: true,
  geofenceEvents: false,
  locationEvents: true,
  locationListenerStatus: true,
  movingGeofenceEvents: false,
  tripsEvents: true,
};

const ErrorCodes = {
  InvalidUserId: 'GS402',
};


//-------User-------

const createTestUser = async () => {
  return new Promise((resolve, reject) => {
    const handleCreateUserCallback = async (success) => {
      AsyncStorage.setItem('userId', success.userId);
      resolve(success);
    };
    const handleCreateUserError = (error) => {
      reject(error);
    };
    Roam.createUser(
      'test-user',
      handleCreateUserCallback,
      handleCreateUserError,
    );
  });
};

const loadTestUser = async (id) => {
  return new Promise((resolve, reject) => {
    const handleLoadUserCallback = async (success) => {
      resolve(success);
    };
    const handleLoadUserError = (error) => {
      reject(error);
    };
    Roam.getUser(id, handleLoadUserCallback, handleLoadUserError);
  });
};


//------Tracking Config-------

const setTrackingConfig = async (accuracy, timeout, source, discardLocation) => {
  return new Promise((resolve, reject) => {
      Roam.setTrackingConfig(parseInt(accuracy), parseInt(timeout), source, discardLocation, success => {
        resolve(success)
      }, error => {
        reject(error)
      })
  })
}

const getTrackingConfig = async () => {
  return new Promise((resolve, reject) => {
    Roam.getTrackingConfig(success => {
      resolve(success)
    }, error => {
      reject(error)
    })
  })
}

const resetTrackingConfig = async () => {
  return new Promise((resolve, reject) => {
    Roam.resetTrackingConfig(success => {
      resolve(success)
    }, error => {
      reject(error)
    })
  })
}







const createTestTrip = async () => {
  return new Promise((resolve, reject) => {
    const handleCreateTripCallback = async success => {
      AsyncStorage.setItem('tripId', success.id);
      resolve(success.id);
    };

    const handleCreateTripError = error => {
      reject(error);
    };

    Roam.createTrip(true, handleCreateTripCallback, handleCreateTripError);
  });
};



const toggleTrip = async (id, isOnGoing) => {
  return new Promise((resolve, reject) => {
    const handleLoadTripCallback = async (success) => {
      console.log(success);
      resolve('STARTED');
    };

    const handleLoadTripError = (error) => {
      console.log(error);
      reject(error);
    };
    console.log(`start trip id ${id}`)
    if(isOnGoing){
      Roam.stopTrip(id, success => {
        // do something on success
        console.log(success)
        resolve('STOPPED')
        },
        error => {
          console.log(error)
          reject(error)
        // do something on error
        });
        Roam.publishAndSave(null);
        Roam.syncTrip(id, (success) => {
          console.log(`sync trip response: ${JSON.stringify(success)}`)
        },
        error => {
          console.log(`sync trip error: ${JSON.stringify(error)}`)
        })
        Roam.deleteTrip(id, (success) => {
          console.log(`delete trip response: ${JSON.stringify(success)}`)
        },
        error => {
          console.log(`delete trip error: ${JSON.stringify(error)}`)
        })
    } else {
      Roam.startTrip(
        id,
        'test-trip',
        handleLoadTripCallback,
        handleLoadTripError,
      );
    }
    
  });
};

const getTripSummary = async id => {
  return new Promise((resolve, reject) => {
    const handleGetTripSummaryCallback = async success => {
      resolve(success);
    };

    const handleGetTripSummaryError = error => {
      console.log(error);
      reject(error);
    };
    Roam.getTripSummary(
      id,
      handleGetTripSummaryCallback,
      handleGetTripSummaryError,
    );
  });
};

export const roam = {
  createTestUser,
  createTestTrip,
  loadTestUser,
  toggleTrip,
  getTripSummary,
  setTrackingConfig,
  Configuration,
  ErrorCodes,
  getTrackingConfig,
  resetTrackingConfig
};
