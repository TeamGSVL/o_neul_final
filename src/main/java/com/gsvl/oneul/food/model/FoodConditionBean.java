package com.gsvl.oneul.food.model;

import com.gsvl.oneul.food.FoodMapper;
import com.gsvl.oneul.food.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FoodConditionBean {

    @Autowired
    private FoodMapper foodMapper;

    private List<FoodConNmEntity> f_cookery;
    private List<FoodConNmEntity> f_worlddiv;
    private List<FoodConNmEntity> igd;
    private List<FoodConNmEntity> f_season;
    private List<FoodConNmEntity> alknm;

    private List<FoodConNmEntity> makeSingleton(List<FoodConNmEntity> list,int num){
        if(list==null){
            list=foodMapper.selConList(num);
        }
        return list;
    }

    @Bean("f_cookery")
    public List<FoodConNmEntity> getF_cookery(){
        return makeSingleton(f_cookery,2);
    }
    @Bean("f_worlddiv")
    public List<FoodConNmEntity> getF_worlddiv(){
        return makeSingleton(f_worlddiv,4);
    }
    @Bean("f_season")
    public List<FoodConNmEntity> getF_season(){
        if(f_season==null){
            f_season=foodMapper.selConList(3);
        }
        return f_season;
    }
    @Bean("igd")
    public List<FoodConNmEntity> getIgd(){
        if(igd==null){
            igd=foodMapper.selConList(5);
        }
        return igd;
    }@Bean("alknm")
    public List<FoodConNmEntity> getAlknm(){
        if(alknm==null){
            alknm=foodMapper.selConList(6);
        }
        return alknm;
    }
}
