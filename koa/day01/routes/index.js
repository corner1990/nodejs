const router = require('koa-router')();

let User = require("../user.js");

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'hello'
  };

  await ctx.render('index', {
  	navList:['信息','关于','相册','留言']
  });
})

.get('/liuyan',async (ctx,next)=>{
	ctx.state = {
		title  : '留言'
	};

	await ctx.render('liuyan',{title:'liuyan'})
	console.log('需要获取参数')
})

.post('/liuyan',async (ctx,next)=>{
	ctx.state = {
		title  : '留言 post'
	};
	// 插入
	function insert() {
 
	    var user = new User({
	        username : 'Tracy McGrady',                 //用户账号
	        userpwd: 'abcd',                            //密码
	        userage: 37,                                //年龄
	        logindate : new Date()                      //最近登录时间
	    });

	    user.save(function (err, res) {

	        if (err) {
	            console.log("Error:" + err);
	        }
	        else {
	            console.log("Res:" + res);
	        }

	    });
	}

	// insert();
	// 更新
	function updata(){
		let wherestr = {'username':"Tracy McGrady"};
		let updatestr = {'username':'leo'};

		User.update(wherestr,updatestr,(err,res)=>{
			if(err){
				throw err
			}

			console.log(`Res:${res}`)
		})
	}
	updata();
	// 使用id更新数据
	function findByIdAndUpdate(){
		let id = '5901dff5636229255162cfb0';
		let updatestr = {'userpwd':'qwe123445'}

		User.findByIdAndUpdate(id,updatestr,(err,res)=>{
			if(err){
				throw err
			}

			console.log(`Res:${res}`)
		})
	}
	// findByIdAndUpdate()
	// 删除
	function del(){
		let wherestr = {'username':'Tracy McGrady'};

		User.remove(wherestr,(err,res)=>{
			if(err){
				throw err
			}
			console.log(`Res:${res}`)
		})
	}
	// del();
	// 查询数据库
	function getByConditions(){
	    let wherestr = {'username' : 'leo'};
	    
	    User.find(wherestr,(err, res)=>{
	        if (err) {
	           throw err
	        }

	        console.log(`Res:${res}`);
	    })
	}

	// getByConditions();
	// 数量查询
	function getCountByConditions(){
		let wherestr = {};
		User.count(wherestr,(err,res)=>{
			if(err){
				throw err
			}
			console.log(`Res:${res}`)
		})
	}
	// getCountByConditions();
	// 根据id查询
	function getById(){
		let id = '5902eee7f7417cd8fa5830e4';

		User.findById(id,(err,res)=>{
			if(err){
				throw err
			}
			console.log(`Res:${res}/nid`)
		})
	}
	// getById()
	// 模糊查询  有点问题
	function getByRegex(){
		// {$regex:/l/i} 
		//  LIKE模糊查询userName包含l字母的数据(%l%)
		let wherestr = {'username': {$regex:/l/i}};

		User.find(wherestr,(err,res)=>{
			if(err){
				throw err
			}

			console.log(`Res:${res}`)
		})
	}
	getByRegex()

	function getByPager(){
	    
	    let pageSize = 5;                   //一页多少条
	    let currentPage = 1;                //当前第几页
	    let sort = {'logindate':-1};        //排序（按登录时间倒序）
	    let condition = {};                 //条件
	    let skipnum = (currentPage - 1) * pageSize;   //跳过数
	    
	    User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec((err, res)=> {
	        if (err) {
	            throw err
	        }
	          console.log("Res:" + res);
	    })
	}

	// getByPager();
	await ctx.render('liuyan',{title:'liuyan post' })

})

module.exports = router;
