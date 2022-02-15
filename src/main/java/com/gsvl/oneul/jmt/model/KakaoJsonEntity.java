package com.gsvl.oneul.jmt.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KakaoJsonEntity {
    private int ijmt;
    private String j_placenm;
    private String j_phone;
    private String j_oldaddr;
    private String j_newaddr;
    private String j_catenm;
}
