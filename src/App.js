import { nanoid } from "nanoid";
import React, { useState } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name) {
    if(name == ""){
       alert("Por favor, insira uma tarefa.");
     }else{
       const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
       setTasks([...tasks, newTask]);
     }
  }
  const taskList = tasks.map(task => (
    <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
      />
    )
  );


  //Conta quantidade de tarefas e verifica se vai imprimir tarefas ou tarefa.  
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  //Título do texto na tela
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
  
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
        
      >
        {taskList}
      </ul>
    </div>
  );
}
export default App;