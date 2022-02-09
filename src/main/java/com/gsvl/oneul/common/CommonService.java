package com.gsvl.oneul.common;

import com.gsvl.oneul.common.model.img.SearchImgVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
