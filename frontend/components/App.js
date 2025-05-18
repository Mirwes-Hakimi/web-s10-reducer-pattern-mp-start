import React,{useReducer} from 'react' // 👈 you'll need the reducer hook
import Quotes from './Quotes'
import QuoteForm from './QuoteForm'



// 👇 these are the types of actions that can change state
const CREATE_QUOTE = 'CREATE_QUOTE'
const DELETE_QUOTE = 'DELETE_QUOTE'
const EDIT_QUOTE_AUTHENTICITY = 'EDIT_QUOTE_AUTHENTICITY' // 👈 toggles the apocryphal property of a single quote
const SET_HIGHLIGHTED_QUOTE = 'SET_HIGHLIGHTED_QUOTE'     // 👈 highlights a quote (or un-highlights it)
const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY'             // 👈 toggles whether to show all or only non-apocryphal

let id = 1
const getNextId = () => id++ // 👈 this is a helper to create new quotes
// const quotes = [
  
// ]


// 👇 create your initial state object here
const initialState = {
displayAllQuotes: true,
highlightQuotes: null,
quotes:[
  {
    id: getNextId(),
    quoteText: "Don't cry because it's over, smile because it happened.",
    authorName: "Dr. Seuss",
    apocryphal: false,
  },
  {
    id: getNextId(),
    quoteText: "So many books, so little time.",
    authorName: "Frank Zappa",
    apocryphal: false,
  },
  {
    id: getNextId(),
    quoteText: "Be yourself; everyone else is already taken.",
    authorName: "Oscar Wilde",
    apocryphal: false,
  }
]
}


const reducer = (state, action) => {
  switch(action.type){
    case CREATE_QUOTE:
      return { ...state, quotes: [
        ...state.quotes, action.payload /// copy the existing quotes and add the new one at the end
      ]}
    case DELETE_QUOTE:
      return {
        ...state, quotes: state.quotes.filter(qt => qt.id !== action.payload)} /// first copy all qoutes then from all quotes just delete on leave the rest of it alone
    case EDIT_QUOTE_AUTHENTICITY:
        return {
          ...state,
           quotes: state.quotes.map(qt => {
              if(qt.id !== action.payload) 
                return qt /// We go through all the quotes using map If the quote’s id is not the one I clicked, just return it as-is.
              return {...qt, apocryphal: !qt.apocryphal} // But if the quote’s id matches, we copy it and flip its apocryphal value.So if it was true, it becomes false, and vice versa
          })
        }
    case SET_HIGHLIGHTED_QUOTE:
       return { ...state, highlightQuotes: state.highlightQuotes === action.payload ? null : action.payload } 
          
    case TOGGLE_VISIBILITY:
      return { ... state, displayAllQuotes: !state.displayAllQuotes }    
  }
}

export default function App() {
  // 👇 use the reducer hook to spin up state and dispatch
   const [state, dispatch] = useReducer(reducer, initialState)

  const createQuote = ({ authorName, quoteText }) => {
    // 👇 use the helper function above to create a new quote
    // 👇 and dispatch it over to the reducer
     const newQuote = {id: getNextId(), authorName, quoteText, apocryphal: false}
     dispatch({type: CREATE_QUOTE, payload: newQuote })
  }
  const deleteQuote = id => {
    // 👇 implement
    dispatch({type: DELETE_QUOTE, payload:id})
  }
  const editQuoteAuthenticity = id => {
    // 👇 implement
   dispatch({ type: EDIT_QUOTE_AUTHENTICITY, payload: id })
  }
  const setHighlightedQuote = id => {
    // 👇 implement
    dispatch({ type: SET_HIGHLIGHTED_QUOTE, payload: id })
  }
  const toggleVisibility = () => {
    // 👇 implement
    dispatch({ type: TOGGLE_VISIBILITY })
  }

  return (
    <div id="mp">
      <h2>Module Project</h2>
      <Quotes
       displayAllQuotes={state.displayAllQuotes}
        quotes={state.quotes}
      // 👇 lots of props are missing! Check the Quotes component
        highlightedQuote={state.highlightQuotes}
        editQuoteAuthenticity={editQuoteAuthenticity}
        setHighlightedQuote={setHighlightedQuote}
        toggleVisibility={toggleVisibility}
        deleteQuote={deleteQuote}
      />
      <QuoteForm
        createQuote={createQuote}
      />
    </div>
  )
}
