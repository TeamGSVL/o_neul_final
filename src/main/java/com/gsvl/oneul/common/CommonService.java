package com.gsvl.oneul.common;

import com.gsvl.oneul.common.model.img.SearchImgVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.List;

@Service
public class CommonService {
    @Autowired
    private MySearchImgApiUtils mySearchImgApiUtils;

    //이미지 검색
    public List<SearchImgVO> getImg(String keyWord,int imgNum){
        List<SearchImgVO> list=mySearchImgApiUtils.searchPlace(keyWord,imgNum);
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

        ResponseEntity<String> responseEntity = restTemplate.exchange(builder.toUriString(), HttpMethod.GET,entity,String.class);
        String result = responseEntity.getBody();
        return result;
    }
}
