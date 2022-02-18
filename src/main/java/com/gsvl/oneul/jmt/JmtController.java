package com.gsvl.oneul.jmt;

import com.gsvl.oneul.common.utils.Const;
import com.gsvl.oneul.jmt.model.JmtEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/jmt")
public class JmtController {
    @Autowired private JmtService service;

    // /jmt/list로 화면이동
    @GetMapping()
    public String goJmtList(){
        return "/jmt/jmtlist";
    }

    // /jmt/detail로 화면이동
    @GetMapping("/{ijmt}")
    public String goJmtDetail(@PathVariable int ijmt, Model model){
        JmtEntity entity = new JmtEntity();
        entity.setIjmt(ijmt);
        model.addAttribute(Const.JMTDETAIL, service.selJmt(entity));
        System.out.println(ijmt);
        return "/jmt/jmtdetail";
    }
    @GetMapping("{ijmt}/review")
    public String goJmtReview(){ return "/jmt/jmtreview";}


}
