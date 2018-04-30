<?php
namespace Home\Controller;
use Think\Controller;
//免费抽奖试用一次手机号
class ZeroMobileController extends MyController {
	public  function __construct(){
		parent::__construct();
	}
/*public function index(){
		$where = ['uid'=>$this->uid,'goods_id'=>47,'status'=>1];
		$buyed = M('GoodOrder')->where($where)->order('id DESC')->find();
		var_dump($buyed);die;
		if($buyed){
			$this->redirect('mobile/insert',['nid'=>$buyed['nid'],'mobile'=>$buyed['note1']]);die;
		}
		$this->input();
	}*/
	public function index(){
		$this->display();
	}
	
	public function insert(){
		$data = I();
		$mobile=$data['mobile'];
		$good_id = 50;
		$mobile_A = D('mobile')->field('mobile')->select();
		$mobile_B = D('zeroMobile')->field('mobile')->select();
		$mobile_data = array_merge($mobile_A,$mobile_B);
		if(in_array($mobile, $mobile_data)){
			$this->error('该账号已经体验过了,请登录',U('Home/Mobile/index'));exit;
		}else{
			if($data['nid']&&($name=M('Name')->where('nid='.$data['nid'])->find())&&check_mobile($mobile)){
		
		}else{
			if(!$data['first_name']||!$data['last_name']||!check_mobile($mobile)){
				$this->index();exit;
			}
			$user_info['first_name']= $data['first_name'];
			$user_info['last_name']= $data['last_name'];
			$user_info['man']= $data['man'];
			$user_info['uid']=$this->uid;
			$user_info['yanli']= date('Ymd',strtotime($data['yanli']));
			$name = D('Name')->add_name($user_info);
			}
			$this->show($name,$mobile);
		}
		/*if($data['nid']&&($name=M('Name')->where('nid='.$data['nid'])->find())&&check_mobile($mobile)){
		
		}else{
			if(!$data['first_name']||!$data['last_name']||!check_mobile($mobile)){
				$this->index();exit;
			}
			$user_info['first_name']= $data['first_name'];
			$user_info['last_name']= $data['last_name'];
			$user_info['man']= $data['man'];
			$user_info['uid']=$this->uid;
			$user_info['yanli']= date('Ymd',strtotime($data['yanli']));
			$name = D('Name')->add_name($user_info);
		}
		if(!$res = $this->check_acess($name['nid'],$mobile,$good_id)){
			//未购买则购买
			$good_info = M('goods')->where(['id'=>$good_id])->find();
			$pay = A('Pay');
			$order_info = ['nid'=>$name['nid'],
						   'title'=>$good_info['title'],
						   'goods_id'=>$good_id,
						   'total_fee'=>$good_info['price'],
						   'start_time'=>$today,
						   'uid'=>$this->uid,
						   'note1'=>$mobile,
						   'method'=>I('method')=='Ali'?'Ali':'Wx',
						   'order_no'=>$pay->get_order_no($this->uid)];
			$order_id = $pay->creat_order($order_info);
			
			$_SESSION['back_url'] = U('insert',['nid'=>$name['nid'],'mobile'=>$mobile]);
			$pay->pay($order_info['method'],$order_info['order_no']); 
		}*/
		$this->show($name,$mobile);
	}
	public function show($name,$mobile){
		$name_num = $name['d_num'];
		//归属地
		$location = $this->get_location($mobile);
		$city_num = M('cityGua')->where('location=\''.$location.'\'')->find()['d_num']?:11;
		$city_desc = M('mobileResult')->where(['name_num'=>$name_num,'type'=>2,'num'=>$city_num])->find()['level']?:'平';
		//数字
		$no_zero = str_replace(0,'',$mobile);
		$suf_3 = substr($no_zero,-3);
		$suf_2 = substr($no_zero,-2);
		$num_desc = M('mobileResult')->where(['type'=>1,'name_num'=>$name_num,'num'=>$suf_3])->find()['level']?:(M('mobileResult')->where(['type'=>1,'name_num'=>$name_num,'num'=>$suf_2])->find()['level']?:'平');
		$res = M('mobileDesc')->where(['num_res'=>$num_desc,'locat_res'=>$city_desc,])->select();
		$res = $res[array_rand($res)];

		$res['nid']=$name['nid'];
		$res['mobile'] = $mobile;
		$res['last_two']= M('lastTwo')->where(['num'=>$suf_2])->find()['desc'];
		$res['name_gua'] = $name['d_num'];
		$res['name_name'] = $name['d_name'];
		$res['name']=$name['last_name'].$name['first_name'];
		$res['num_gua'] = $this->get_gua($suf_2);
		$res['num_name'] = M('guaMap')->where('d_num='.$res['num_gua'])->find()['d_name'];
		$list = $this->get_list();
		session('mobile',$mobile);
		$this->assign('mobile',$this->user_info['mobile']);
		$this->assign('list',$list);
		$this->assign('res',$res);
		$this->display('numResult');
	}
	
	public function buy(){
		
		//dump($name);die;
		$goods_id = 46;
		$nid = I('nid');
		$mobile = session('mobile')?:I('mobile');
		if(!$nid||!check_mobile($mobile)){
			$this->error('参数缺失');
		}
		$res = $this->check_acess($nid,$mobile,$goods_id);
		if($res){
			session('nid',$nid);
			session('mobile',$mobile);
			$name = M('Name')->find($res['nid']);
			$this->assign('name',$name);
			$this->display('chooseNumber');
		}else{
			$name = M('name')->find($nid);
			//未购买则购买
			$good_info = M('goods')->where(['id'=>$goods_id])->find();
			$pay = A('Pay');
			$order_info = ['nid'=>$name['nid'],
						   'title'=>$good_info['title'],
						   'goods_id'=>$goods_id,
						   'total_fee'=>$good_info['price'],
						   'type'=>I('type'),
						   'uid'=>$this->uid,
						   'note1'=>$mobile,
						   'method'=>I('method')=='Ali'?'Ali':'Wx',
						   'order_no'=>$pay->get_order_no($this->uid)];
			$order_id = $pay->creat_order($order_info);
			$_SESSION['back_url'] = U('buy',['nid'=>$name['nid'],'mobile'=>$mobile]);
			$pay->pay($order_info['method'],$order_info['order_no']); 
		}
	}
	//ajax  接口
	public function get_best(){
		$nid = session('nid')*1;
		$mobile = session('mobile');
		//测试
		//$nid = 315;
		//$mobile = 13545663370;
		
		$type = I('type',1);
		if(!$nid||!check_mobile($mobile)){
			$this->AjaxReturn(['code'=>-1,'msg'=>'页面过期,请重新进入该页面']);
		}
		$name = M('Name')->find($nid);
		$locat = $this->get_location($mobile);
		
		//最吉后面3/2位
		$best_suf = M('mobileResult')->field('num')->where(['name_num'=>$name['d_num'],'level'=>['in',['最吉','大吉']],'type'=>1])->limit(3)->select();
		$best_suf = array_column($best_suf,'num');
		//全国号码
		
		if($type==1){
			$sql = "SELECT locat as location,c.code,operator FROM `f_mobile_result` a RIGHT JOIN f_city_gua b ON a.num=b.d_num inner join f_mobile_location c on c.city=b.location WHERE a.type=2 AND a.`level`='大吉' AND a.name_num=".$name['d_num'].' GROUP BY operator';
		}else{
			$sql = "SELECT locat as location,code FROM `f_mobile_location` a inner JOIN f_city_gua b ON a.city=b.location WHERE city='$locat' GROUP BY operator";
		}
		$best_locat = M()->query($sql);
		$res = [];
		foreach($best_locat as $city){
			foreach($best_suf as $suf){
				$suf = str_pad($suf,4,'*',STR_PAD_LEFT);
				$res[] = ['city'=>$city['location'],'mobile'=>$city['code'].$suf];
			}
		}
		$this->ajaxReturn(['code'=>1,'res'=>$res]);
		
	}
	public function get_list(){
		$sql = "SELECT a.note1,b.* FROM `f_good_order` a INNER JOIN f_name b ON a.nid=b.nid WHERE a.`status`=1 AND goods_id=47 AND a.uid=".$this->uid.' LIMIT 10';
		return  M()->query($sql);
		
	}
	//手机后面2位卦数
	public function get_gua($num){
		$num1 = $num[0]!=9?$num[0]:1;
		$num2 = $num[1]!=9?$num[1]:1;
		return $num1.$num2;
	}
	//暂不用
	protected function check_acess($nid,$mobile,$goods_id){
		// $huangli = D('GoodOrder')->get_order($this->uid,$nid);
		// if($huangli){
			// return $this->user_info;
		// }
		$where = ['nid'=>$nid,'uid'=>$this->uid,'goods_id'=>$goods_id,'status'=>1,'note1'=>$mobile];
		$buyed = M('GoodOrder')->where($where)->find();
		if($buyed){
			return $buyed;
		}
		return false;
	}
	protected function get_location($mobile){
		$pre_7 = substr($mobile,0,7);
		$res = M('MobileLocation')->where('code='.$pre_7)->find()['city'];
		if($res) return $res;
		$url = 'http://sj.apidata.cn/?mobile='.$mobile;
		$res = file_get_contents($url);
		$res = json_decode($res,1);
		if($res['status']==1){
			return $res['data']['city'];
		}
		return '北京';
	}
}