const initialState = {};
export const reducer_name = (state=initialState, action) => {
      switch(action.type){
        case ACTION_TYPE_1 :
          return {...state};
  
        case ACTION_TYPE_2 :
          return {...state};
  
        case ACTION_TYPE_3 :
          return {...state};
  
        default: 
          return initialState;
      }
    }