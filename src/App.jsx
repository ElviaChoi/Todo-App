import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", checked: false },
    { id: 1, content: "코딩 공부하기", checked: false },
    { id: 2, content: "잠 자기", checked: false },
  ]);

  return (
    <div className="container">
      <Header />{ /* header추가 */}
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

function Header() {
  return (
    <header> 💡 나의 Todo 리스트</header>
  );
}


function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="todo-input">
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue, checked: false };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(todo.content);

  const todoComplete = () => {
    setTodoList((prev) => 
      prev.map((el) => 
        el.id === todo.id ? {...el, checked: !el.checked } : el
      )
    );
  };
  
  return (
    <li>
      {/* 체크박스 추가 */}
      <input
        type="checkbox"
        checked={todo.checked}
        onChange={todoComplete}
      />

      {isEditing ? (
        <>
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
        />
          <button
            onClick={() => {
              setTodoList((prev) =>
                prev.map((el) =>
                  el.id === todo.id ? { ...el, content: inputValue } : el
                )
              );
              setIsEditing(false);
            }}
          >
            저장
          </button>
          <button onClick={() => setIsEditing(false)}>취소</button>
          </>  
      ) : (
        <>
        {todo.content}
        <button onClick={ () => setIsEditing(true)}>수정</button>
        </>
      )}
      <button
        onClick={() => {
          setTodoList((prev) => {
            return prev.filter((el) => el.id !== todo.id);
          });
        }}
      >
        삭제
      </button>
    </li>
  );
}

export default App;
