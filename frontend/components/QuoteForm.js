import React,{ useReducer } from 'react' // 👈 you'll need the reducer hook


// 👇 these are the types of actions that can change state
const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'


  // 👇 some props are missing in the JSX below:
  return (
    <form id="quoteForm" onSubmit={onNewQuote}>
      <h3>New Quote Form</h3>
      <label><span>Author:</span>
        <input
          type='text'
          value={state.autorName}
          name='authorName'
          placeholder='type author name'
          onChange={onChange}
        />
      </label>
      <label><span>Quote text:</span>
        <textarea
          type='text'
          value={state.quoteText}
          name='quoteText'
          placeholder='type quote'
          onChange={onChange}
        />
      </label>
      <label><span>Create quote:</span>
        <button
          role='submit'
        >DO IT!</button>
      </label>
    </form>
  )
}
