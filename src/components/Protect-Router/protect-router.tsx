import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import { useSelector } from '../../state/store';

type TProtectedRoute = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element
}

const ProtectedRoute = ({onlyUnAuth = false, component}: TProtectedRoute) => {
  const isAuth = useSelector(state => state.userReducers.isAuthCheck);
  const user = useSelector((state) => state.userReducers.user);
  const isLoading = useSelector((state) => state.userReducers.isLoading);
  const isManager = useSelector((state) => state.userReducers.user?.isManager);
  const location = useLocation();
  
  // если идет загрузка или не проверена авторизация
  if (isLoading) {
    return <div/>
  }

  // если юзер не авторизован но это ДЛЯ АВТОРИЗИРОВАННЫХ
  // if (!user && !onlyUnAuth) {
  //   return <Navigate to="/login" state={{from: location}}/>;
  // }
  
  // если юзер авторизирован но это ДЛЯ МЕНЕДЖЕРА
  if ( !onlyUnAuth && !isManager) {
    return <Navigate to="/login"/>;
  }

  // если юзер авторизован но это ДЛЯ НЕ АВТОРИЗИРОВАННЫХ
  if (onlyUnAuth && user) {
    const { from } = location.state || {from : {pathname: "/"}};
    return <Navigate to={from}/>
  }

  return component;
};

export const OnlyManager = ProtectedRoute;
export const OnlyUnAuth = ({ component } : { component: React.JSX.Element}) => (
  <ProtectedRoute onlyUnAuth={true} component={component}/>
)