package com.gsvl.oneul.food.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class FoodConditionEntity {
    private List<String> f_cookery;
    private List<String> f_worlddiv;
    private List<String> igd;
    private int f_season;
    private int alknum;
    private int alone;
}
