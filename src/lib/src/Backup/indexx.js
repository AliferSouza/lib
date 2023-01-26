import Alert from "../Notificação/alert.js";
import autoExecultar from "../Ulteis/autoExecultar.js";
import navigatorTo from "../historyNavigator/navigatorTo.js";
import useGetDb from "../Banco/useGetDb.js";
import atualizarComp from "../DOM/atualizarComp.js";
import addBanco from "../Banco/addBanco.js";
import addComponet from "../DOM/addComponet.js";
import Api from "../requisições/api.js";
import gerarId from "../ulteis/gerarId.js";
import backup from "../ulteis/backup.js";
import dbSetItem from "../banco/dbSetItem.js";
import erroPage from "../componentesIndoor/erroPage.js";
import gerarQueryString from "../URL/gerarQueryString.js";
import useState from '../EstadoApp/useState.js'
import useEffect from '../EstadoApp/useEffect.js'
import useMemo from '../EstadoApp/useMemo.js'
import  Router  from "../Router/router.js";
import useTags from "../DOM/useTags.js";


const ctxApp = {
  pathname: location.pathname,
  pathCompleto: location.pathname.split("/"),
  href: location.href,
  document: document,
};


export {
  Alert,
  autoExecultar,
  navigatorTo,
  dbSetItem,
  useGetDb,
  atualizarComp,
  addComponet,
  Api,
  addBanco,
  gerarId,
  backup,
  erroPage,
  gerarQueryString,
  Router,
  useTags,
  useState,
  useEffect,
  useMemo,
  ctxApp,

};
