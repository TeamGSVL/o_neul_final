package com.gsvl.oneul.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.gsvl.oneul.common.model.img.SearchImgVO;
import com.gsvl.oneul.common.utils.MySearchImgApiUtils;
import com.gsvl.oneul.food.FoodMapper;
import com.gsvl.oneul.food.model.FoodConditionEntity;
import com.gsvl.oneul.food.model.FoodResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class CommonService {
    @Autowired
    private MySearchImgApiUtils mySearchImgApiUtils;
    @Autowired
    private FoodMapper foodMapper;

    //이미지 검색
    public List<SearchImgVO> getImg(String keyWord,int imgNum){
        //이미지 검색하기전 DB에 이미지가 있는지 확인
        FoodConditionEntity entity = new FoodConditionEntity();
        entity.setF_nm(keyWord);
        entity.setFdnum(1);
        List<FoodResultVO> voList = foodMapper.selFoodList(entity);
        if(voList.get(0).getF_img()==null||imgNum!=1){
            List<SearchImgVO> list=mySearchImgApiUtils.searchPlace(keyWord,imgNum);
            if(imgNum!=1){
                return list;
            }
            if(list!=null){
                entity.setF_img(list.get(0).getLink());
            }
            int result = foodMapper.insFoodImg(entity);
            return list;
        }
        List<SearchImgVO> list = new ArrayList();
        SearchImgVO imgVO = new SearchImgVO();
        imgVO.setLink(voList.get(0).getF_img());
        list.add(imgVO);

        return list;
    }

    //카카오json페이지 통신
    public String getkakaoJsonPage(int ijmt){
        //ijmt를 카카오 맵에서 가져옴 (id)
        String url = "https://place.map.kakao.com/main/v/"+ijmt;

        UriComponents builder = UriComponentsBuilder.fromHttpUrl(url).build();

        //레스트 탬플릿 생성
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters().add(0,new StringHttpMessageConverter(Charset.forName("UTF-8")));

        final HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON_UTF8));

        HttpEntity<String> entity = new HttpEntity(headers);
        //통신해서 kakaoJson가져오기
        ResponseEntity<String> responseEntity = restTemplate.exchange(builder.toUriString(), HttpMethod.GET,entity,String.class);
        String result = responseEntity.getBody();

        //Json형태의 String에서 값 가져오기
        ObjectMapper om = new JsonMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        JsonNode jsonNode = null;

        String j_placenm= null;
        try {
            jsonNode = om.readTree(result);
            //경로를 다 찾아서 String.class를 넣어주면 그 경로에 String 값을 뽑아서 보내줌줌
           j_placenm =om.treeToValue(jsonNode.path("basicInfo").path("placenamefull"),String.class);

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        System.out.println(j_placenm);

        return result;
    }
}
